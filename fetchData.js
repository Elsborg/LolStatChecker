// const url = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/lil%20hook?api_key=secret'
// const champUrl = 'https://ddragon.leagueoflegends.com/cdn/9.18.1/data/en_US/champion.json'

// export function getSummoner() {
//   fetch(url)
//     .then( response => {
//       if (!response.ok) throw new Error('Invalid summonername')
//       return response.json()
//     })
//     .then(data => {
//        return data.puuid
//     })
//     .catch(error => {
//       console.log('Error', error)
//     })
// }

// export function getChampionIcon() {
//   fetch(champUrl)
//     .then( response => {
//       if (!response.ok) throw new Error('No image found')
//       return response.json()
//     })
//     .then(data => {
//       const champions = Object.values(data.data)

//       const champImageContainer = document.getElementById('champImageContainer')

//       champions.forEach(champion => {
//         const championName = champion.name
//         const championImageUrl = `https://ddragon.leagueoflegends.com/cdn/9.18.1/img/champion/${champion.image.full}`

//         const championContainer = document.createElement('div')
//         championContainer.classList.add('champion-container')

//         const championNameElement = document.createElement('p')
//         championNameElement.textContent = championName
//         championContainer.appendChild(championNameElement)


//         const img = new Image()
//         img.src = championImageUrl

//         championContainer.appendChild(img)
//         champImageContainer.appendChild(championContainer)

       
//       })
//         })
//     .catch(error => {
//       console.log('Error', error)
//     })
// }

// getChampionIcon()

document.getElementById("summonerForm").addEventListener("submit", function(event) {
    event.preventDefault()

    const riotIdInput = document.getElementById('summonerData').value
    const [gameName, tagLine] = riotIdInput.split('#')

    const formattedGameName = encodeURIComponent(gameName.trim())

    const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${formattedGameName}/${tagLine}?api_key=secret`
    const proxyUrl = `https://cors-anywhere-yted.onrender.com/${url}`;
    fetch(proxyUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      // Handle the response data
      console.log(data)
      document.getElementById('summonerInfo').innerHTML = JSON.stringify(data, null, 2)
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error)
    })

})



