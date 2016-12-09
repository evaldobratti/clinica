from django.conf.urls import url

from . import views
from . import serialiazers

app_name = 'core'
urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^pessoas/$', views.home, name='pessoa_listagem'),
    url(r'^api/auth/$', views.auth),
    url(r'^api/auth_data/$', views.get_user_data),
    url(r'^api/pessoas/$', serialiazers.PessoaFisicaRecordsListView.as_view()),
    url(r'^api/pessoas/(?P<pk>[0-9]+)/$', serialiazers.PessoaFisicaRecordsManagementView.as_view())

]