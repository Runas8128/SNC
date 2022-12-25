function generateSpan(clazz, text) {
  const span = document.createElement('span');
  span.classList.add(clazz);
  span.innerHTML = text;
  return span
}

function generateBlock(obj) {
  return [
    generateSpan('id', obj.a)
  ];
}

function getSummary(post) {
  if (Object.keys(post).length === 0) return;

  const a = document.createElement('a');

  a.classList.add('post');
  a.href = `/blog/${post.id}/page`;

  a.appendChild(generateSpan('num', post.id));
  a.appendChild(generateSpan('title', post.title));
  a.appendChild(generateSpan('writer', post.author));
  a.appendChild(generateSpan('date', post.created));
  a.appendChild(generateSpan('count', post.view));

  return a;
}

function getThumbnail(post) {
  if (Object.keys(post).length === 0) return;

  const article = document.createElement('article');

  article.classList.add('post');
  article.style.cursor = 'pointer';
  article.style.width = 'fit-content';
  article.onclick = () => {
    location.href = `/gallery/${post.id}/page`;
  }

  const img = document.createElement('img');
  img.src = post.body;
  img.width = 196; // 50%

  article.appendChild(img);

  article.appendChild(
    generateSpan('about', `${post.title} by ${post.author} on ${post.created}`)
  );

  return article;
}
