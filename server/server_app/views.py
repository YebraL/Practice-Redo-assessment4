from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from server_app.models import Category, Post

# Create your views here.

def send_the_homepage(request):
    
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

@api_view(["GET", "POST"])
def categories(request):
    
    if request.method == 'GET':
        getCategories = Category.objects.all().values()
        data = list(getCategories)
        return JsonResponse({'success': data})
    
    if request.method == 'POST':
        title = request.data['title']
        new_Category = Category.objects.create(title= title)
        new_Category.save()
        return JsonResponse({'success': True})

@api_view(["PUT","DELETE"])
def category(request, category_id):
    category_section = Category.objects.get(id=category_id)
    
    if request.method == 'PUT':
        new_Title = request.data['title']
        category_section.title = new_Title
        category_section.save()
        return JsonResponse({'success':True})
    
    if request.method == 'DELETE':
        print(category_id)
        target = Category.objects.get(id= category_id)
        target.delete()
        return JsonResponse({'success':True})