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

function setPageHeader(post) {
  const topDiv = document.getElementsByClassName('post_page')[0];
  const header = document.createElement('header');
  const div = document.createElement('div');

  const h1 = document.createElement('h1');
  h1.innerHTML = post.title;
  div.appendChild(h1);

  const about = document.createElement('div');
  about.classList.add('about');
  about.innerHTML = `작성자: ${post.author} / 게시일: ${post.created}`;
  div.appendChild(about);

  header.appendChild(div);
  topDiv.insertBefore(header, topDiv.firstChild);
}

function setPageFooter(next, prev) {
  const topDiv = document.getElementsByClassName('post_page')[0];

  const hr = document.createElement('hr');
  topDiv.appendChild(hr);

  const table = document.createElement('table');
  table.setAttribute('id', 'move_page');
  table.appendChild(makeTR(next, 'move_next', '▲'));
  table.appendChild(makeTR(prev, 'move_prev', '▼'));
  topDiv.appendChild(table);
}

function makeTR(post, id, arrow) {
  const row = document.createElement('tr');
  row.setAttribute('id', id);

  const summary = getSummary(post);
  if (summary) {
    row.appendChild(generateSpan(arrow, 'arrow'));
    row.appendChild(summary);
  }

  return row;
}
