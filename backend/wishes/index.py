"""
Business: API для управления желаниями на ёлке - получение всех желаний и добавление новых
Args: event - dict с httpMethod, body, queryStringParameters
      context - object с attributes: request_id, function_name
Returns: HTTP response dict с JSON данными
"""

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def get_db_connection():
    """Создание подключения к базе данных"""
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError('DATABASE_URL environment variable is not set')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Обработчик запросов для работы с желаниями
    GET - получить все желания
    POST - добавить новое желание
    OPTIONS - CORS preflight
    """
    method: str = event.get('httpMethod', 'GET')
    
    # Обработка CORS OPTIONS запроса
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        if method == 'GET':
            # Получение всех желаний
            cursor.execute('''
                SELECT id, name, address, phone, wish, position_x, position_y, created_at
                FROM wishes
                ORDER BY created_at DESC
            ''')
            
            wishes = cursor.fetchall()
            
            # Преобразование данных в нужный формат
            result = []
            for wish in wishes:
                result.append({
                    'id': str(wish['id']),
                    'name': wish['name'],
                    'address': wish['address'],
                    'phone': wish['phone'],
                    'wish': wish['wish'],
                    'position': {
                        'x': wish['position_x'],
                        'y': wish['position_y']
                    },
                    'createdAt': wish['created_at'].isoformat() if wish['created_at'] else None
                })
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'wishes': result}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            # Добавление нового желания
            body_data = json.loads(event.get('body', '{}'))
            
            name = body_data.get('name', '').strip()
            address = body_data.get('address', '').strip()
            phone = body_data.get('phone', '').strip()
            wish = body_data.get('wish', '').strip()
            position = body_data.get('position', {})
            position_x = position.get('x')
            position_y = position.get('y')
            
            # Валидация данных
            if not all([name, address, phone, wish, position_x is not None, position_y is not None]):
                cursor.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Все поля обязательны для заполнения'}),
                    'isBase64Encoded': False
                }
            
            # Проверка, нет ли уже желания на этой позиции
            cursor.execute('''
                SELECT id FROM wishes WHERE position_x = %s AND position_y = %s
            ''', (position_x, position_y))
            
            if cursor.fetchone():
                cursor.close()
                conn.close()
                return {
                    'statusCode': 409,
                    'headers': headers,
                    'body': json.dumps({'error': 'На этом месте уже есть желание'}),
                    'isBase64Encoded': False
                }
            
            # Вставка нового желания
            cursor.execute('''
                INSERT INTO wishes (name, address, phone, wish, position_x, position_y)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id, name, address, phone, wish, position_x, position_y, created_at
            ''', (name, address, phone, wish, position_x, position_y))
            
            new_wish = cursor.fetchone()
            conn.commit()
            
            result = {
                'id': str(new_wish['id']),
                'name': new_wish['name'],
                'address': new_wish['address'],
                'phone': new_wish['phone'],
                'wish': new_wish['wish'],
                'position': {
                    'x': new_wish['position_x'],
                    'y': new_wish['position_y']
                },
                'createdAt': new_wish['created_at'].isoformat() if new_wish['created_at'] else None
            }
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': headers,
                'body': json.dumps({'wish': result}),
                'isBase64Encoded': False
            }
        
        else:
            cursor.close()
            conn.close()
            return {
                'statusCode': 405,
                'headers': headers,
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': f'Server error: {str(e)}'}),
            'isBase64Encoded': False
        }
