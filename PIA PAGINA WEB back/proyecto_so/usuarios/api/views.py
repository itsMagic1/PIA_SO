from rest_framework.views import APIView
from usuarios.api.serializers import RegisterSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

class RegisterApiView(APIView):
    
    def post(self, request):
        print('hola')
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            User.objects.create_user(**serializer.validated_data)
            return Response(status=status.HTTP_200_OK, data={'message': 'Usuario creado correctamente'}) 
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'Hubo un problema'}) 
    
    def get(self, request):
        usuarios = User.objects.all()
        serializer = RegisterSerializer(usuarios, many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)


class LoginApiview(APIView):
    
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        
        user = authenticate(username=username, password=password)
        
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)