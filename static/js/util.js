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

  const h3 = document.createElement('h3');
  h3.innerHTML = post.title;
  div.appendChild(h3);

  const about = document.createElement('div');
  about.classList.add('about');
  about.innerHTML = `작성자: ${post.author} / 게시일: ${post.created}`;
  div.appendChild(about);

  header.appendChild(div);
  topDiv.insertBefore(header, topDiv.firstChild);
}

function setPageFooter(next, prev, summarizer) {
  const topDiv = document.getElementsByClassName('post_page')[0];

  const hr = document.createElement('hr');
  topDiv.appendChild(hr);

  const table = document.createElement('table');
  table.setAttribute('id', 'move_page');
  table.appendChild(makeTR(next, 'move_next', '▲', summarizer));
  table.appendChild(makeTR(prev, 'move_prev', '▼', summarizer));
  topDiv.appendChild(table);
}

function makeTR(post, id, arrow, summarizer) {
  const row = document.createElement('tr');
  row.setAttribute('id', id);

  const summary = summarizer(post);
  if (summary) {
    row.appendChild(generateSpan(arrow, 'arrow'));
    row.appendChild(summary);
  }

  return row;
}

function makeLink(info, { github, instagram }) {
  const item = document.createElement('div');
  item.classList.add('nav_item');

  const infoSpan = document.createElement('span');
  infoSpan.innerHTML = info;
  item.appendChild(infoSpan);

  const a = document.createElement('a');
  a.target = "_blank";
  if (github) {
    a.href = `https://www.github.com/${github}`;
    a.appendChild(getGithubImg());
  }
  else if (instagram) {
    a.href = `https://www.instagram.com/${instagram}/`;
    a.appendChild(getInstaImg());
  }
  item.appendChild(a);

  return item;
}

function getGithubImg() {
  const img = document.createElement('img');
  img.style.verticalAlign = 'bottom';
  img.src = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
  img.alt = "github link";
  return img;
}

function getInstaImg() {
  const img = document.createElement('img');
  img.style.verticalAlign = 'bottom';
  img.src = "https://static.cdninstagram.com/rsrc.php/yS/r/f_5NUHW7AZC.ico";
  img.alt = "instagram link";
  return img;
}
