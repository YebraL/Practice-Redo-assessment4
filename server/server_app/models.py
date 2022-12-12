from django.db import models

# Create your models here.

class Category(models.Model):
    title= models.CharField(max_length=255)
    
    def __str__(self):
        return f'{self.title , self.pk}'
    
class Post(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.title, self.content, self.category}'