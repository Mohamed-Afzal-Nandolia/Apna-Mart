import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";


export const useAllItems = () => {
    const [allItems, setAllItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(BASE_URL + '/api/item/all-items', {
                    headers: {
                        'Authorization': localStorage.getItem('Authorization')
                    }
                });
                setAllItems(response.data);
            } catch (error) {
                setError(error.message);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);
    
    
  return {allItems, loading, error}
}
