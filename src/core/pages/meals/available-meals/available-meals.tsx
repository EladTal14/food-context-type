import {Meal} from "../../../../shared/interfaces/meal";
import './available-meals.css'
import {Card} from "../../../../shared/components/ui/card/card";
import {MealItem} from "../meal-item/meal-item";
import {useMealsApi} from "../../../../shared/hooks/use-meals-api";

export const AvailableMeals = () => {
    const {setMeals, meals, isLoading, httpError} = useMealsApi()
    const mealsList = meals.map((meal: Meal) => {
        return (
            <MealItem key={meal.id} {...meal}/>
        );
    });
    if (isLoading) {
        return (
            <section className="meals-loading">
                <p>Loading...</p>
            </section>
        )
    }
    if (httpError) {
        return (
            <section className="meals-error">
                <p>{httpError}</p>
            </section>
        )
    }
    return (
        <section className="meals">
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
};

