from .models import Task
from rest_framework import status
from .serializers import TaskSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator


class ListCreateTask(APIView):
    def get(self, request):
        try:
            page = request.query_params.get('page', 1)
            per_page = request.query_params.get('per_page', 10)

            tasks = Task.objects.order_by('id')  # Order by id

            paginator = Paginator(tasks, per_page)
            tasks = paginator.page(page)

            serializer = TaskSerializer(tasks, many=True)

            paginated_response = {
                'count': len(tasks),
                'page': tasks.number,
                'per_page': per_page,
                'total_pages': paginator.num_pages,
                'total': paginator.count,
                'data': serializer.data
            }

            return Response(paginated_response, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def post(self, request):
        try:
            serializer = TaskSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
        except Exception as e:
            return Response({"message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RetrieveUpdateDeleteTask(APIView):
    def get(self, request, id):
        try:
            task = get_object_or_404(Task, pk=id)
            serializer = TaskSerializer(task)
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   
        except Exception as e:
            return Response({"message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, id):
        try:
            task = get_object_or_404(Task, pk=id)
            serializer = TaskSerializer(task, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
        except Exception as e:
            return Response({"message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, id):
        try:
            task = get_object_or_404(Task, pk=id)
            task.delete()
            return Response({"message": "Task deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
