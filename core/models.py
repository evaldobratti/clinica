from __future__ import unicode_literals

from django.db import models


class Pessoa(models.Model):
    codigo = models.PositiveIntegerField()
    nome = models.CharField(max_length=200)
    emails = models.ManyToManyField('Email')
    telefones = models.ManyToManyField('Telefone')

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if not self.pk:
            self.codigo = (Pessoa.objects.aggregate(models.Max('codigo')).get('codigo__max', 0) or 0) + 1

        return super(Pessoa, self).save(force_insert, force_update, using, update_fields)


class PessoaFisica(Pessoa):
    data_nascimento = models.DateField(null=True)
    sexo = models.CharField(max_length=1, choices=(
        ('M', 'Masculino'),
        ('F', 'Feminino')
    ))


class Email(models.Model):
    endereco = models.EmailField()


class TelefoneOperadora(models.Model):
    nome = models.CharField(max_length=30)


class TelefoneTipo(models.Model):
    nome = models.CharField(max_length=30)


class Telefone(models.Model):
    numero = models.CharField(max_length=30)
    operadora = models.ForeignKey(TelefoneOperadora)
    tipo = models.ForeignKey(TelefoneTipo)


class Estado(models.Model):
    nome = models.CharField(max_length=100)


class Cidade(models.Model):
    nome = models.CharField(max_length=100)
    estado = models.ForeignKey(Estado)
    cep = models.CharField(max_length=15)


class Endereco(models.Model):
    logradouro = models.CharField(max_length=200)
    numero = models.CharField(max_length=30)
    complemento = models.CharField(max_length=200)
    cidade = models.ForeignKey(Cidade)
