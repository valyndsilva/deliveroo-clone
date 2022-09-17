import { useNavigation } from "@react-navigation/native";
import SanityClientConstructor from "@sanity/client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
} from "react-native";

import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { Categories, FeaturedRow } from "../components";
import { client } from "../lib/sanity";

export default function HomeScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    // when ui loads
    navigation.setOptions({
      //   headerTitle: "Testing",
      headerShown: false, // hides the default header
    });
  }, []);

  const [featuredCategories, setFeaturedCategories] = useState([]);
  useEffect(() => {
    // when the component loads
    const query = `*[_type=="featured"]{
        ...,
        restaurants[]->{
          ...,
            dishes[]->,

        },
      }`;
    client.fetch(query).then((data) => {
      setFeaturedCategories(data);
    });
  }, []);
  console.log(featuredCategories);

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className="flex flex-row items-center pb-3 mx-2 space-x-2 ">
        <Image
          source={{
            uri: "https://images.prismic.io/dbhq-deliveroo-riders-website/ed825791-0ba4-452c-b2cb-b5381067aad3_RW_hk_kit_importance.png?auto=compress,format&rect=0,0,1753,1816&w=1400&h=1450",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/* Search */}
      <View className="flex- flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
            className=""
          />
        </View>
        <AdjustmentsVerticalIcon size={20} color="#00CCBB" />
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100 flex-1 pb-28"
        // contentContainerStyle="paddingBottom:100"
      >
        {/* Categories */}
        <Categories />

        {/* FeaturedRow*/}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
