

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genre_id', models.IntegerField()),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('released_date', models.DateTimeField(auto_now_add=True)),
                ('popularity', models.FloatField()),
                ('vote_avg', models.IntegerField()),
                ('overview', models.TextField()),
                ('poster_path', models.TextField()),
                ('backdrop_path', models.TextField(null=True)),
                ('movie_id', models.IntegerField()),
                ('click', models.IntegerField()),
                ('genres', models.ManyToManyField(to='tmdb_json.Genre')),
            ],
        ),
        migrations.CreateModel(
            name='Credit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cast_name', models.TextField()),
                ('profile_path', models.TextField(null=True)),
                ('credit_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tmdb_json.movie')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField()),
                ('nickname', models.TextField()),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tmdb_json.movie')),
            ],
        ),
    ]
