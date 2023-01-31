
const fetchData = async (apiUrl) => {
    try {
        let result = await fetch(apiUrl);
        let Data = await result.json();
    
        return Data;

    } catch (err) {
        return err;
    }
}

export default fetchData;