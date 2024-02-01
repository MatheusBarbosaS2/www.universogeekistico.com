document.getElementById('newPostForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var title = document.getElementById('title').value;
    var img = document.getElementById('img').value;
    var content = document.getElementById('content').value;

    var post = document.createElement('div');
    post.innerHTML = '<h2>' + title + '</h2><img src="' + img + '"><p>' + content + '</p>';

    var posts = document.getElementById('posts');
    posts.insertBefore(post, posts.firstChild);
});
