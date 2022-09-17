import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import { client } from "../lib/sanity";

export default function FeaturedRow({ title, description, id }) {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const query = `*[_type=="featured" && _id == $id]{
      ...,
      restaurants[]->{
        ...,
          dishes[]->,
            type->{
              name
            }
      },
    }[0]`;
    client.fetch(query, { id }).then((data) => {
      setRestaurants(data?.restaurants);
    });
  }, [id]);
  console.log(restaurants);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-cold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        // contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4 px-4"
      >
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            address={restaurant.address}
            genre={restaurant.type?.name}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
}
