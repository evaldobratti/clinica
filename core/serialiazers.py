from django.contrib.auth.models import User
from .models import PessoaFisica
from rest_framework import serializers, generics, permissions, mixins


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')


class PessoaFisicaListSerializer(serializers.ModelSerializer):
    data_nascimento = serializers.DateField(allow_null=True)

    class Meta:
        model = PessoaFisica
        fields = ('id', 'codigo', 'nome', 'sexo', 'data_nascimento')
        read_only_fields = ('id', 'codigo')


class PessoaFisicaRecordsListView(generics.ListCreateAPIView):
    queryset = PessoaFisica.objects.all()
    serializer_class = PessoaFisicaListSerializer
    permission_classes = [permissions.IsAuthenticated]


class PessoaFisicaRecordsManagementView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PessoaFisica.objects.all()
    serializer_class = PessoaFisicaListSerializer
    permission_classes = [permissions.IsAuthenticated]