import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Note: useEffect never returns a Promise. so we can't use async/await inside useEffect directly. for making it possible, we can make a function inside useEffect and in that function, we can use async/await. 
  useEffect(() => {
    const fetchMeals = async () => {
      setError(null);
      const response = await fetch('https://react-foodorderapp-ba473-default-rtdb.firebaseio.com/meals.json');
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return <section className={classes.MealsLoading}>
      <p>
        Loading...
      </p>
    </section>
  }

  if (error) {
    return <section className={classes.MealsError}>
      <p>
        {error}
      </p>
    </section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
