from django.urls import path
from .views import ListCreateTask, RetrieveUpdateDeleteTask

urlpatterns = [
    path('tasks/<int:id>', RetrieveUpdateDeleteTask.as_view()),
    path('tasks', ListCreateTask.as_view())
]