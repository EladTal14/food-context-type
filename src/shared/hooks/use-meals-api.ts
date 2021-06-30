import {useEffect, useState} from "react";
import {Meal} from "../interfaces/meal";
import {getMealsFromDb} from "../services/http-calls";

export const useMealsApi = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fecthMeals = async () => {
            const data = await getMealsFromDb();
            const loadedMeals: Meal[] = [];
            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price,
                    amount: data[key].amount
                })
            }
            setMeals(loadedMeals)
            setIsLoading(false)
        }
        fecthMeals().catch(err => {
            setIsLoading(false)
            setHttpError(err.message)
        });
    }, [])

    return {meals, setMeals, isLoading, httpError};
}