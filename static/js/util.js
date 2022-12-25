function generateSpan(text, clazz) {
  const span = document.createElement('td');
  span.innerHTML = text;

  span.classList.add(clazz);
  return span
}

function generateTD(clazz, child) {
  const td = document.createElement('td');

  if (child instanceof Node) {
    td.appendChild(child);
  }
  else {
    td.innerHTML = child;
  }

  td.classList.add(clazz);
  return td
}

function getSummary(post) {
  if (Object.keys(post).length === 0) return;

  const rowElement = document.createElement('tr');
  rowElement.classList.add('post');
  rowElement.style.cursor = 'pointer';
  rowElement.onclick = () => location.href = `/blog/${post.id}/page`;

  rowElement.appendChild(generateTD('num', post.id));
  rowElement.appendChild(generateTD('title', post.title));
  rowElement.appendChild(generateTD('writer', post.author));
  rowElement.appendChild(generateTD('date', post.created));
  rowElement.appendChild(generateTD('count', post.view));

  return rowElement;
}

function getThumbnail(post) {
  if (Object.keys(post).length === 0) return;

  const rowElement = document.createElement('tr');
  rowElement.classList.add('post');
  rowElement.style.cursor = 'pointer';
  rowElement.onclick = () => location.href = `/gallery/${post.id}/page`;

  const img = document.createElement('img');
  img.src = post.body;
  img.width = 75;

  rowElement.appendChild(generateTD('num', post.id));
  rowElement.appendChild(generateTD('title', post.title));
  rowElement.appendChild(generateTD('image', img));
  rowElement.appendChild(generateTD('writer', post.author));
  rowElement.appendChild(generateTD('date', post.created));
  rowElement.appendChild(generateTD('count', post.view));

  return rowElement;
}
