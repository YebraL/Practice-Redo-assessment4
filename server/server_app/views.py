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

@api_view(["PUT", "DELETE", "GET"])
def category(request, category_id):
    category_section = Category.objects.get(id=category_id)
    
    if request.method == 'GET':
        getPosts = Post.objects.filter(category = category_id ).values()
        data = list(getPosts)
        print(category_id)
        return JsonResponse({'success': data})
        
    if request.method == 'PUT':
        # print('update triggered')
        new_Title = request.data['title']
        print(new_Title)
        category_section.title = new_Title
        category_section.save()
        return JsonResponse({'success':True})
    
    if request.method == 'DELETE':
        print(category_id)
        target = Category.objects.get(id= category_id)
        target.delete()
        return JsonResponse({'success':True})
    
@api_view(["GET"])
def posts(request):
    if request.method == 'GET':
        getPosts = Post.objects.all().values()
        data = list(getPosts)
        return JsonResponse({'success': data})
    return JsonResponse({'success': True})

@api_view(["GET", "POST"])
def post_by_category_id(request, id_category):
    
    if request.method == 'GET':
        getPosts = Post.objects.filter(category = id_category ).values()
        data = list(getPosts)
        print(id_category)
        return JsonResponse({'success': data})
    
    if request.method == 'POST':
        print('This trigger')
        
        categor = Category.objects.get(id= id_category)
        
        title = request.data['title']
        # print(title)
        content= request.data['content']
        # print(content)
        post = Post.objects.create(title=title, category=categor, content=content)
        post.save()
        print('it saved!')
        return JsonResponse({'success':True})

    return JsonResponse({'Fail': True})

@api_view(["DELETE", "PUT", "GET"])
def post_edit(request, post_id):
    post_section = Post.objects.get(id=post_id)
    
    if request.method == 'GET':
        print('Trigger GET')
        targetObject = list(Post.objects.all().filter(id=post_id).values())
        # print(targetObject)
        
        return JsonResponse({'success':targetObject})
    
    if request.method == 'DELETE':
        print(post_id, 'Delete was triggered')
        target = Post.objects.get(id= post_id)
        target.delete()
        return JsonResponse({'success':True})
    
    if request.method == 'PUT':
        print('triggered PUT')
        new_Title = request.data['title']
        new_Content = request.data['content']
        print(new_Title, new_Content)
        post_section.title = new_Title
        post_section.content = new_Content
        post_section.save()
        return JsonResponse({'success':True})