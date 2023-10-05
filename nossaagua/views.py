from rest_framework import viewsets
from nossaagua.models import Morador, FaltouAgua
from nossaagua.serializer import MoradorSerializer, FaltouAguaSerializer
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated

class MoradorViewSet(viewsets.ModelViewSet):
    """Exibindo todos os moradores"""
    queryset = Morador.objects.all()
    serializer_class = MoradorSerializer
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]
    
class FaltouAguaViewSet(viewsets.ModelViewSet):
    """Exibindo todas as respostas sobre a água"""
    queryset = FaltouAgua.objects.all()
    serializer_class = FaltouAguaSerializer
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]

