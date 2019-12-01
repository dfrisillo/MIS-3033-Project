const app={};


app.getArtists=(artist)=>$.ajax({
url:'http://api.spotify.com/v1/search',
method:'GET',
dataType:'json',
data:{
type: 'artist'
q:artist
}
});

app.getArtistsAlbums = (id) =>$.ajax({
url:'http://api.spotify.com/v1/artists/${id}/albums',
method:'GET',
dataType:'json',
data:{
album_type: 'album'
}
});

app.getAlbumTracks = (id) =>$.ajax({
url:'http://api.spotify.com/v1/albums/${id}/tracks',
method:'GET',
dataType:'json',
});

app.getAlbums = function(artists){
let albums=artists.map(artist=>app.getArtistsAlbums(artist.id));
$.when(...albums)
.then((..albums)=>{
let albumIds=albums
.map(a=>a[0].items)
.reduce((prev,curr)=>[...prev,...curr],[]
.map(album=>app.getAlbumTracks(album.id));

app.getTracks(albumIds
});
});



//Allows the User to enter some Names
app.events=function(){
$('form').on('submit',function(e){
e.preventDefault();
$('.loader').toggleClass('show');
let artists=$('input[type=search]').val();
artists= artists.split(',');
let search =artists.map(artistName=>app.searchArtist(artistName));

app.retrieveArtistInfo(search);

});
});

//Go To Spotify and Get the Artists
app.searchArtist=(artistName=>$.ajax({
url: '${app.apiUrl}/search',
method:'GET',
dataType:'json',
data:{
q:artistName
type:'artist'
}
});

//With the IDS we want to get the albums
app.getArtistAlbums=(artistID)=>$.ajax({
url:'$[app.apiUrl}/artists/${artistID}/albums',
method:'Get'
dataType:'json'
data:{
album_type:'album'
}
});

//Then Get The Tracks
app.getArtistTracks=(id)=>$.ajax({
url:'$[app.apiUrl}/artists/${id}/tracks',
method:'Get'
dataType:'json'
};

//Then Build the Playlist
app.BuildPlayList=function(tracks){
$.when(...tracks)
.then((...trackResults)=>{
trackResults=trackResults.map(getFirstElement)
.map(item=>item.items)
.reduce(flatten,[])
.map(item=>item.id);

const randomTracks=[];
for(let i=0; i<30; i++)
{
randomTracks.push(getRandomTrack(trackResults));
}
const baseUrl="http://embed.spotify.com/?theme=white&uri=spotify:trackset:My Playlist:${
randomTracks.join()}';


$('.loader').toogleClass('show'); 
$('.playlist').html(<iframe src="${baseUrl}" height="400></iframe>');

});
};



app.retrieveArtistInfo=function(search){
$.when(...search)
.then((...results)=>{
results= results.map(getFirstElement)
.map(res => res.artists.items[0].id)
.map(id=>app.getArtistAlbums(id));

app.retrieveArtistTracks(results);
});
});




app.retrieveArtistTracks=function(artistAlbums){
$.when(...artistAlbums)
.then((...albums)=>{
albumIds=albums.map(getFirstElement);
.map(res=>res.items);
.reduce((prev,curr)=> [...prev,...currl],[])
.map(album=>album.id);
.map(ids=> app.getArtistTracks(ids));
app.buildPlaylist(albumIds);
});
}

const getFirstElement=(item)=>item[0];

app.init=function(){
app.events();
};
$(app.init);



