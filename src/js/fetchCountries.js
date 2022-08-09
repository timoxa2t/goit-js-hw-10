

export default function fetchCountries(name){
    const searchParams = new URLSearchParams({
        fields: "name,capital,population,flags,languages"
      });
    let url = `https://restcountries.com/v3.1/name/${name}?${searchParams}`
    console.log(url)
    return fetch(url)
    .then(result => {
        if(!result.ok)
        throw Error(result.toString())
        return result.json()
    })
}