# -*- coding: utf-8 -*-
"""
Created on Wed Nov 23 14:23:34 2022

@author: LAPTOP
"""

from flask import Flask 
from flask import request
import os
from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

app=Flask(__name__) #Instanciacion clase flask

@app.route('/')
def uno():
    x=os.environ.get("Prueba")
    return x

@app.route('/sms')
def dos():
    try:
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)
        
        contenido=request.args.get("mensaje")
        destino=request.args.get("telefono")
        
        message = client.messages \
                        .create(
                             body=contenido,
                             from_='+17262273533',
                             to='+57'+destino
                         )
        
        print(message.sid)
        return "Mensaje enviado exitosamente!"
    except Exception as e:
        return "Error el mensaje no se pudo enviar"
    
@app.route('/e-mail')
def mail():
    
    destino=request.args.get("email-destino")
    asunto=request.args.get("asunto")
    contenido=request.args.get("mensaje")
    
    message = Mail(
        from_email='andreaolejua3@gmail.com',
        to_emails=destino,
        subject=asunto,
        html_content=contenido)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return "Correo enviado exitosamente!"
    except Exception as e:
        print(e.message)
        return "Error el mensaje no pudo ser enviado"
    

if __name__=='__main__':
    app.run()