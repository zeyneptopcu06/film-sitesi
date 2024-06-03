//TMDB 

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;
//film türlerini seçmek için
var selectedGenre = []
setGenre();
function setGenre() {
    tagsEl.innerHTML= '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                        if(id == genre.id){
                            selectedGenre.splice(idx, 1);
                        }
                    })
                }else{
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)
            getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
            highlightSelection()
        })
        tagsEl.append(t);
    })
    
}
//film türlerini vurgulamak için
function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight')
    })
    clearBtn()
    if(selectedGenre.length !=0){   
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('highlight');
        })
    }

}
//temizlemek için
function clearBtn(){
    let clearBtn = document.getElementById('clear');
    if(clearBtn){
        clearBtn.classList.add('highlight')
    }else{
            
        let clear = document.createElement('div');
        clear.classList.add('tag','highlight');
        clear.id = 'clear';
        clear.innerText = 'Clear';
        clear.addEventListener('click', () => {
            selectedGenre = [];
            setGenre();            
            getMovies(API_URL);
        })
        tagsEl.append(clear);
    }
    
}

getMovies(API_URL);
//film verilerini almak için
function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length !== 0){
            showMovies(data.results);
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = data.total_pages;

            current.innerText = currentPage;

            if(currentPage <= 1){
              prev.classList.add('disabled');
              next.classList.remove('disabled')
            }else if(currentPage>= totalPages){
              prev.classList.remove('disabled');
              next.classList.add('disabled')
            }else{
              prev.classList.remove('disabled');
              next.classList.remove('disabled')
            }

            tagsEl.scrollIntoView({behavior : 'smooth'})

        }else{
            main.innerHTML= `<h1 class="no-results">Sonuç bulunamadı.</h1>`
        }
        
    })

}
//filmleri göstermek için
function showMovies(data) {
  main.innerHTML = '';

  data.forEach(movie => {
      const {title, poster_path, vote_average, overview, id} = movie;
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      movieEl.innerHTML = `
          <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">

          <div class="movie-info">
              <h3>${title}</h3>
              <span class="${getColor(vote_average)}">${vote_average}</span>
          </div>

          <div class="overview">

              <h3>Overview</h3>
              ${overview}
              <br/> 
              <button class="know-more" id="${id}">Daha fazla bilgi</button>
            </div>
          </div>
      `;
      movieEl.querySelector('.overview').appendChild(addLikeButton(id));

      main.appendChild(movieEl);

      document.getElementById(id).addEventListener('click', () => {
        console.log(id)
        openNav(movie)
      });
  });
}

// Kullanıcı giriş yaptığında
function loginUser(id) {
  // Yeni bir kullanıcı girişi olduğunda mevcut kullanıcı verilerini temizle
  handleNewUser();

  // Yeni kullanıcı kimliğini localStorage'a kaydet
  localStorage.setItem('loggedInUserId', $id);

  // Yeni kullanıcı için beğenilen filmleri saklamak üzere localStorage'da yeni bir anahtar oluştur
  if (!localStorage.getItem(`likedMovies_${id}`)) {
    localStorage.setItem(`likedMovies_${id}`, JSON.stringify([]));
  }
}

// Başka bir kullanıcı giriş yaptığında
function handleNewUser() {
  // Sayfayı temizle
  main.innerHTML = '';

  // Önceki kullanıcının beğenilen filmlerini temizle
  const id = localStorage.getItem('loggedInUserId');
  if (id) {
    localStorage.removeItem(`likedMovies_${id}`);
    localStorage.removeItem('loggedInUserId');
  }
}

// Kullanıcı çıkış yaptığında
function logout() {
  // Giriş yapan kullanıcının kimliğini al
  const id = localStorage.getItem('loggedInUserId');
  
  // Beğenilen filmleri sakla ve çıkış yap
  if (id) {
    localStorage.removeItem('loggedInUserId');
  }
}

// Her film öğesine bir "Beğen" düğmesi eklemek için işlev
function addLikeButton(movieId) {
  const likeButton = document.createElement('button');
  likeButton.textContent = 'Beğen';
  likeButton.classList.add('like-button');
  likeButton.addEventListener('click', () => {
      likeMovie(movieId);
  });

  return likeButton;
}





// Bir filmi beğenmek için işlev
function likeMovie(movieId) {
  //Giriş yapmış kullanıcının kimliğini al
  const id = localStorage.getItem('loggedInUserId');
  if (!id) {
    alert('Önce giriş yapmalısınız!');
    return;
  }
  
  let likedMovies = JSON.parse(localStorage.getItem(`likedMovies_${id}`)) || [];
  if (!likedMovies.includes(movieId)) {
      likedMovies.push(movieId);
      localStorage.setItem(`likedMovies_${id}`, JSON.stringify(likedMovies));
      alert('Film beğenildi!');
  }else  {
    alert('Bu film zaten beğenildi!');
      return;
  }
  showLikedMovies();
}
//beğenilen filmleri göstermek için
function showLikedMovies() {
  const id = localStorage.getItem('loggedInUserId');
  const likedMoviesKey = `likedMovies_${id}`;
  let likedMovies = JSON.parse(localStorage.getItem(likedMoviesKey)) || [];

  tagsEl.innerHTML = '';
  if (likedMovies.length > 0) {
    let likedMoviesPromises = likedMovies.map(movieId => 
      fetch(`${BASE_URL}/movie/${movieId}?${API_KEY}`).then(res => res.json())
    );
    Promise.all(likedMoviesPromises).then(movies => {
      main.innerHTML = ''; // Ana içeriği temizle
      movies.forEach(movie => {
        const { title, poster_path, vote_average, overview, id } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
          <img src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580"}" alt="${title}">
          <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
            <h3>Overview</h3>
            ${overview}
            <br/>
            <button class="know-more" id="${id}">Know More</button>
            <button class="like-button" id="like-${id}">Beğen</button> <!-- Beğen butonu ekle -->
          </div>
        `;

        // Beğenilenler listesinden filmi kaldıran fonksiyon
function removeMovieFromLiked(movieId) {
  const id = localStorage.getItem('loggedInUserId');
  let likedMovies = JSON.parse(localStorage.getItem(`likedMovies_${id}`)) || [];
  likedMovies = likedMovies.filter(likedId => likedId !== movieId);
  localStorage.setItem(`likedMovies_${id}`, JSON.stringify(likedMovies));
}
         // Beğen butonuna dinleyici ekle
const likeButton = movieEl.querySelector(`#like-${id}`);
likeButton.addEventListener('click', () => {
  removeMovieFromLiked(id); // Beğenilenler listesinden filmi kaldır
  showLikedMovies(); // Sayfayı yeniden göster
  alert('Film beğenilenlerden kaldırıldı!');
})
        main.appendChild(movieEl);
      });
    });
  } else {
    main.innerHTML = `<h1 class="no-results">Beğenilen film bulunmamaktadır.</h1>`;
  }
}
document.getElementById('anasayfaButton').addEventListener('click', () => {
  getMovies(API_URL),setGenre()
});



// "Beğenilenler" düğmesine tıklama olayı
document.getElementById('showLikedMoviesButton').addEventListener('click', showLikedMovies);








//filmler ilgili youtube videolarını gostermek için
const overlayContent = document.getElementById('overlay-content');
function openNav(movie) {
  let id = movie.id;
  fetch(BASE_URL + '/movie/'+id+'/videos?'+API_KEY).then(res => res.json()).then(videoData => {
    console.log(videoData);
    if(videoData){
      document.getElementById("myNav").style.width = "100%";
      if(videoData.results.length > 0){
        var embed = [];
        var dots = [];
        videoData.results.forEach((video, idx) => {
          let {name, key, site} = video

          if(site == 'YouTube'){
              
            embed.push(`
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          
          `)

            dots.push(`
              <span class="dot">${idx + 1}</span>
            `)
          }
        })
        
        var content = `
        <h1 class="no-results">${movie.original_title}</h1>
        <br/>
        
        ${embed.join('')}
        <br/>

        <div class="dots">${dots.join('')}</div>
        
        `
        overlayContent.innerHTML = content;
        activeSlide=0;
        showVideos();
      }else{
        overlayContent.innerHTML = `<h1 class="no-results">No Results Found</h1>`
      }
    }
  })
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

var activeSlide = 0;
var totalVideos = 0;

function showVideos(){
  let embedClasses = document.querySelectorAll('.embed');
  let dots = document.querySelectorAll('.dot');

  totalVideos = embedClasses.length; 
  embedClasses.forEach((embedTag, idx) => {
    if(activeSlide == idx){
      embedTag.classList.add('show')
      embedTag.classList.remove('hide')

    }else{
      embedTag.classList.add('hide');
      embedTag.classList.remove('show')
    }
  })

  dots.forEach((dot, indx) => {
    if(activeSlide == indx){
      dot.classList.add('active');
    }else{
      dot.classList.remove('active')
    }
  })
}

const leftArrow = document.getElementById('left-arrow')
const rightArrow = document.getElementById('right-arrow')

leftArrow.addEventListener('click', () => {
  if(activeSlide > 0){
    activeSlide--;
  }else{
    activeSlide = totalVideos -1;
  }

  showVideos()
})

rightArrow.addEventListener('click', () => {
  if(activeSlide < (totalVideos -1)){
    activeSlide++;
  }else{
    activeSlide = 0;
  }
  showVideos()
})


function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const searchTerm = search.value;
    selectedGenre=[];
    setGenre();
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(API_URL);
    }

})

prev.addEventListener('click', () => {
  if(prevPage > 0){
    pageCall(prevPage);
  }
})

next.addEventListener('click', () => {
  if(nextPage <= totalPages){
    pageCall(nextPage);
  }
})

function pageCall(page){
  let urlSplit = lastUrl.split('?');
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length -1].split('=');
  if(key[0] != 'page'){
    let url = lastUrl + '&page='+page
    getMovies(url);
  }else{
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length -1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] +'?'+ b
    getMovies(url);
  }
}






