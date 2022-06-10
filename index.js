const handleSearch = async (event) => {
  event.preventDefault();
  
  // implemente a consulta a partir daqui
  const messageStatus = document.getElementById('message');
  const showsList = document.getElementById('shows');
  const url = `https://api.tvmaze.com/search/shows?q=${document.getElementById('query').value}`;
  const result = await fetch(url);
  const listFetched = await result.json();

  messageStatus.innerHTML = "";
  showsList.innerHTML = "";

  console.log(messageStatus,showsList,url,result.ok);

  if (!result.ok) {
    messageStatus.innerHTML = "Failed to fetch results.";
    return;
  }

  if (listFetched.length === 0) {
    messageStatus.innerText = "Not Found!"
    return;
  }

  listFetched.forEach((item) => {
    const showName = item?.show?.name;
    const showImage = item?.show?.image?.medium || "";

    showsList.insertAdjacentHTML("beforeend", `
            <li>
                <img class="poster" src="${showImage}" />
                <span class="show-name">${showName}</span>
            </li>
    `)
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#search-form')
    .addEventListener('submit', handleSearch);
});
