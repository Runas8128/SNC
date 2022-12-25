function generateSpan(text, clazz) {
  const span = document.createElement('td');
  span.innerHTML = text;

  span.classList.add(clazz);
  return span
}

function generateTD(text, clazz, href) {
  const td = document.createElement('td');

  if (href) {
    const a = document.createElement('a');
    a.href = href;
    a.innerHTML = text;
    td.appendChild(a);
  }
  else {
    td.innerHTML = text;
  }

  td.classList.add(clazz);
  return td
}

function getSummary(post) {
  if (Object.keys(post).length === 0) return;

  const rowElement = document.createElement('tr');

  rowElement.classList.add('post');

  rowElement.appendChild(generateTD(post.id, 'num'));
  rowElement.appendChild(generateTD(post.title, 'title', `/blog/${post.id}/page`));
  rowElement.appendChild(generateTD(post.author, 'writer'));
  rowElement.appendChild(generateTD(post.created, 'date'));
  rowElement.appendChild(generateTD(post.view, 'count'));

  return rowElement;
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
  img.width = 50; // 50%

  article.appendChild(img);

  article.appendChild(
    generateSpan(`${post.title} by ${post.author} on ${post.created}`, 'about')
  );

  return article;
}
