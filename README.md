# Resources:

- [React Native](https://reactnative.dev/)
- [Sanity CMS](https://www.sanity.io/)
- [NativeWind](https://www.nativewind.dev/quick-starts/expo)
- [React Navigation](https://reactnavigation.org/)
- [Expo](https://docs.expo.dev/)

# Terminal commands:

```js
npm install --global expo-cli
npx create-expo-app project-name
```

To run your project, navigate to the directory and run one of the following npm commands.

```js
cd deliveroo-clone
code .
expo start OR npx expo start
```

```
? (opens all the options of expo)
› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu

› Press ? │ show all commands
```

- Install Expo Go on your phone and scan the QR code to open the app.

To erase all simulatordevices:

```
xcrun simctl erase all
expo start -c
```

- Install NativeWind and Setup Tailwind CSS:
  Follow steps from this [link](https://www.nativewind.dev/quick-starts/expo).

```
npm install nativewind
npm install --dev tailwindcss
npx tailwindcss init
```

Edit tailwind.config.js:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./<custom-folder>/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Modify your babel.config.js:

```
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel"],
  };
};
```

Modify App.js to check if NaiveWind and Tailwind CSS has been setup properly:

```
import React, { Component } from "react";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-red-500">Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

```

Next, let's setup [React Navigation](https://reactnavigation.org/docs/getting-started) and i'ts dependencies:

```
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
```

Wrapping your app in NavigationContainer in App.js or index.js:

```
import React, { Component } from "react";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-red-500">Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
    </NavigationContainer>
  );
}
```

Installing [Native stack navigator library](https://reactnavigation.org/docs/hello-react-navigation):

```
npm install @react-navigation/native-stack
```

Creating a native stack navigator:
createNativeStackNavigator is a function that returns an object containing 2 properties: Screen and Navigator. Both of them are React components used for configuring the navigator. The Navigator should contain Screen elements as its children to define the configuration for routes.

NavigationContainer is a component which manages our navigation tree and contains the navigation state. This component must wrap all navigators structure. Usually, we'd render this component at the root of our app, which is usually the component exported from App.js.

```
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

```

Next, lets create a screens folder in the root and in it HomeScreen.js:
Note: Type in rnf or rnfe tab to get the ract-native functional snippet.

```
import React from "react";
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text className="text-red-500">HomeScreen</Text>
    </View>
  );
}

```

Next, update App.js:

```
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {HomeScreen} from "./screens";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

```

If tailwind CSS isn't working properly after this step:

- Stop the expo server and instead of starting it like "expo start" do "expo start -c" to wipe the cache that nativewind adds and restart server
  This should solve the issue:[Styles not working](https://www.nativewind.dev/guides/troubleshooting)

In React-Native all elements are set by default to flex-col as opposed to flex in React.

Install [React Native Heroicons](https://www.npmjs.com/package/react-native-heroicons):

```
npm i react-native-heroicons
expo install react-native-svg
```

Setup HomeScreen:

```
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
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

export default function HomeScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      //   headerTitle: "Testing",
      headerShown: false, // hides the default header
    });
  }, []);
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
      <ScrollView>
        {/* Categories */}

        {/* Featured Row 1 */}


        {/* Featured Row 2 */}


        {/* Featured Row 3 */}


      </ScrollView>
    </SafeAreaView>
  );
}

```

Next create a components folder in the root and file Categories.js.
rnfe tab

```
import { View, Text } from "react-native";
import React from "react";

const categories = () => {
  return (
    <View>
      <Text>categories</Text>
    </View>
  );
};

export default categories;

```

## Adding Images in React Native:

Create in assets/images/index.js:
All all you images here.

```
const images = {
  sushiImg: require("../../assets/images/sushi.jpeg"),
  sushi1Img: require("../../assets/images/sushi-1.jpeg"),
  ///you can add more many images like this here.
};

module.exports = images;

```

Or directly import the image and styles in the file you need to use it in:

```
  const sushiImg = require("../assets/images/sushi.jpeg");
  const styles = StyleSheet.create({
    image: {
      width: 80,
      height: 80,
      padding: 10,
      marginLeft: 10,
      borderRadius: 10,
    },
  });
```

To use the image:

```
 <Image source={sushiImg} style={styles.image} />
```

Or directly import the image with tailwindcss styles in the file you need to use it in:

```
    <Image source={sushiImg} className="h-20 w-20 rounded" />
```

If you intend to use image Urls and style you can use it:

```
 var imageURI =
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80";
      const styles = StyleSheet.create({
    image: {
      width: 80,
      height: 80,
      padding: 10,
      marginLeft: 10,
      borderRadius: 10,
    },
  });
```

And use it this way:

```
  <Image source={{ uri: imageURI }} style={styles.image} />
```

Or directly import the Url:

```
<Image source={{ uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80" }} style={styles.image} />

```

Or directly import the image with tailwindcss styles in the file you need to use it in:

```
    <Image source={{ uri: imageURI }} className="h-20 w-20 rounded" />
```

```
<Image source={{ uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80" }} className="h-20 w-20 rounded"  />

```

In Categories.js:

```
import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import CategoryCard from "./CategoryCard";
import { sushiImg, sushi1Img } from "../assets/images";
const Categories = () => {
  //   const sushiImg = require("../assets/images/sushi.jpeg");
    // const sushiImgUri = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80";

  //   const styles = StyleSheet.create({
  //     image: {
  //       width: 80,
  //       height: 80,
  //       borderRadius: 10,
  //     },
  //   });

  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* CategoryCard */}
      {/* <Image source={{ uri: sushiImgUri }} style={styles.image} /> */}
      {/* <Image source={sushiImg} style={styles.image} />*/}
      <CategoryCard imgUrl={sushiImg} title="testing 1" />
      <CategoryCard imgUrl={sushi1Img} title="testing 2" />
      <CategoryCard imgUrl={sushi1Img} title="testing 3" />
      <CategoryCard imgUrl={sushi1Img} title="testing 4" />
      <CategoryCard imgUrl={sushi1Img} title="testing 5" />
      <CategoryCard imgUrl={sushi1Img} title="testing 6" />
      <CategoryCard imgUrl={sushi1Img} title="testing 7" />
      <CategoryCard imgUrl={sushi1Img} title="testing 8" />
    </ScrollView>
  );
};

export default Categories;

```

In CategoryCard.js:
TouchableOpcaity is like a button when you touch/click it it changes opacity.

```
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

function CategoryCard({ imgUrl, title }) {
  return (
    <TouchableOpacity className="mr-2 relative">
      {/* <Image source={{ uri: imgUrl }} style={styles.image} /> */}
      <Image source={imgUrl} className="h-20 w-20 rounded" />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default CategoryCard;


```

Update HomeScreen to add Featured Rows:

```
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
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

export default function HomeScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      //   headerTitle: "Testing",
      headerShown: false, // hides the default header
    });
  }, []);
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
        className="bg-gray-100 flex-1"
        contentContainerStyle="paddingBottom:100"
      >
        {/* Categories */}
        <Categories />

        {/* Featured Row 1 */}
        <FeaturedRow
          title="Featured"
          description="Paid placements for our partners"
          id="featured"
        />

        {/* Featured Row 2 */}
        <FeaturedRow
          title="Discounts"
          description="Everyone's been enjoying these juicy discounts!"
          id="discounts"
        />

        {/* Featured Row 3 */}
        <FeaturedRow
          title="Offers near you"
          description="Why not support your local restaurant tonight?"
          id="offers"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

```

In components create FeaturedRow.js and RestaurantCard.js:

In FeaturedRow.js:

```
import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";

export default function FeaturedRow({ title, description, id }) {
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-cold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        <RestaurantCard
          id={1}
          imgUrl="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
          title="Yo! Sushi"
          rating={4.7}
          genre="Japanese"
          address="123 Main St"
          short_description="This is a Japanese restaurant"
          dishes={[]}
          long={20}
          lat={0}
        />
         <RestaurantCard
          id={1}
          imgUrl="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
          title="Yo! Sushi"
          rating={4.7}
          genre="Japanese"
          address="123 Main St"
          short_description="This is a Japanese restaurant"
          dishes={[]}
          long={20}
          lat={0}
        />
         <RestaurantCard
          id={1}
          imgUrl="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
          title="Yo! Sushi"
          rating={4.7}
          genre="Japanese"
          address="123 Main St"
          short_description="This is a Japanese restaurant"
          dishes={[]}
          long={20}
          lat={0}
        />
      </ScrollView>
    </View>
  );
}


```

In RestaurantCard.js:

```
import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";

export default function RestaurantCard({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) {
  return (
    <TouchableOpacity className="bg-white mr-3 shadow">
      <Image source={{ uri: imgUrl }} className="h-36 w-64 rounded-sm" />
      <View className="px-3 pb-4">
        <Text className="font-cold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating} </Text>· {genre}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="gray" opacity={0.4} size={22} />
          <Text className="text-xs text-gray-500">Nearby · {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}


```

## Adding Sanity:

```
sudo npm install -g @sanity/cli
sanity init --coupon javascriptmastery2022
Project name: deliveroo-clone
Use the default dataset configuration? y
Project output path: sanity-studio
Blog (schema)
cd sanity-studio
sanity start
Go to http://localhost:3333
```

Open sanity-studio/schemas/
Create category.js:

```
export default {
  name: "category",
  title: "Menu Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Category Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image of Category",
      type: "image",
    },
  ],
};


```

Create dish.js:

```
export default {
  name: "dish",
  title: "Dish",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name of dish",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      title: "Short description about the dish",
      type: "string",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "price",
      title: "Price of the dish in GBP",
      type: "number",
    },
    {
      name: "image",
      title: "Image of the dish",
      type: "image",
    },
  ],
};

```

Create restaurant.js:

```
export default {
  name: "restaurant",
  title: "Restaurant",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Restaurant Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      title: "Short description",
      type: "string",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "image",
      title: "Image of the restaurant",
      type: "image",
    },
    {
      name: "lat",
      title: "Restaurant Latitude co-ordinate",
      type: "number",
    },
    {
      name: "long",
      title: "Restaurant Longitude co-ordinate",
      type: "number",
    },
    {
      name: "address",
      title: "Restaurant Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      title: "Enter a rating from 1 and 5",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .error("Please enter a value between 1 and 5"),
    },
    {
      name: "type",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "dishes",
      title: "Dishes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "dish" }] }],
    },
  ],
};


```

Create featured.js:

```
export default {
  name: "featured",
  title: "Featured Menu Categories",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Featured Category Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      title: "Short description",
      type: "string",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "restaurants",
      title: "Restaurants",
      type: "array",
      of: [{ type: "reference", to: [{ type: "restaurant" }] }],
    },
  ],
};

```

Update sanity-studio/schemas/schema.js:

```
// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import blockContent from "./blockContent";
import category from "./category";
import restaurant from "./restaurant";
import dish from "./dish";
import featured from "./featured";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    restaurant,
    dish,
    featured,
    category,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
  ]),
});

```

To fix expo error:

```
expo doctor --fix-dependencies
expo start -c
```

## To avoid the jest-haste-map: Haste module naming collision ERROR:

The error looks something like this:

```
jest-haste-map: Haste module naming collision: deliveroo-clone
  The following files share their name; please adjust your hasteImpl:
    * <rootDir>/package.json
    * <rootDir>/sanity-studio/package.json
```

Create a metro.config.js OR rn-cli.config.js(if not using expo) file:

In metro.config.js:

```
const exclusionList = require("metro-config/src/defaults/exclusionList");

// exclusionList is a function that takes an array of regexes and combines
// them with the default exclusions to return a single regex.

module.exports = {
    resolver: {
        blacklistRE: exclusionList([/sanity-studio\/.*/]),
    },
};
```

## To avoid the error: Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead:

Change "main" in package.json from "node_modules/expo/AppEntry.js" to a custom file: "main": "entry.js"

Create entry.js in the root directory:

```
import 'expo/build/Expo.fx';
import { AppRegistry, Platform } from 'react-native';
import withExpoRoot from 'expo/build/launch/withExpoRoot';

import App from './App';
import { createRoot } from "react-dom/client";

AppRegistry.registerComponent('main', () => withExpoRoot(App));
if (Platform.OS === 'web') {
  const rootTag = createRoot(document.getElementById('root') ?? document.getElementById('main'));
  const RootComponent = withExpoRoot(App);
  rootTag.render(<RootComponent />);
}
```

This should remove the error.

Now try to run the app for the web:
expo start --web

It should load without any errors.

If you come across peer dependencies or in compatibility errors:

```
 npm install --legacy-peer-deps
```

## Connect Frontend to Sanity Backend:

```
cd deliveroo-clone
npm install @sanity/client @sanity/image-url
```

Run this to add exception for localhost 3000 CORS policy:

```
cd sanity-studio
sanity cors add http://localhost:3000
sanity cors add http://localhost:19006
```

Create sanity.js in the root:

```
import sanityClient from "@sanity/client";
import { imageUrlBuilder } from "@sanity/image-url";

const client = sanityClient({
  projectId: "mja96fb7",
  dataset: "production",
  useCdn: true,
  apiVersion: "v1",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source); //helper function

export default client;

```

You can deploy sanity studio online:

```
cs sanity-studio
sanity deploy
Studio hostname (<value>.sanity.studio): deliveroo-sanity-clone
Go to https://deliveroo-sanity-clone.sanity.studio/
```

Query info from a sanity CMS backend using GROQ:

Update screens/HomeScreen.js:

```
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

```

Update FeaturedRow.js:

```
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

```

The images won't work at this point as we are pulling in a sanity url. You need to update the sanity image url using the helper function urlFor().url() created earlier. This give a string value that you can pass to the image prop.

Update ResaturantCard.js:

```
import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../lib/sanity";

export default function RestaurantCard({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) {
  return (
    <TouchableOpacity className="bg-white mr-3 shadow">
      <Image source={{ uri: urlFor(imgUrl).url() }} className="h-36 w-64 rounded-sm" />
      <View className="px-3 pb-4">
        <Text className="font-cold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating} </Text>· {genre}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="gray" opacity={0.4} size={22} />
          <Text className="text-xs text-gray-500">Nearby · {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

```

Next update Categories.js:

```
import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import CategoryCard from "./CategoryCard";
import { sushiImg, sushi1Img } from "../assets/images";
import { client, urlFor } from "../lib/sanity";
const Categories = () => {
  //   const sushiImg = require("../assets/images/sushi.jpeg");
  // const sushiImgUri = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80";

  //   const styles = StyleSheet.create({
  //     image: {
  //       width: 80,
  //       height: 80,
  //       borderRadius: 10,
  //     },
  //   });
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const query = `*[_type=="category"]`;
    client.fetch(query).then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <ScrollView
      // contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
      className="px-4 pt-2"
    >
      {/* CategoryCard */}
      {/* <Image source={{ uri: sushiImgUri }} style={styles.image} /> */}
      {/* <Image source={sushiImg} style={styles.image} />*/}
      {/* <CategoryCard imgUrl={sushiImg} title="testing 1" /> */}
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;


```

And CategoryCard.js:

```
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

function CategoryCard({ imgUrl, title }) {
  return (
    <TouchableOpacity className="mr-2 relative">
      {/* <Image source={{ uri: imgUrl }} style={styles.image} /> */}
      {/* <Image source={imgUrl} className="h-20 w-20 rounded"/> */}
      <Image source={{ uri: imgUrl }} className="h-20 w-20 rounded" />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default CategoryCard;

```

Next, let's build the Restaurant Screen:
First create RestaurantScreen.js in screens folder:

```
import { View, Text } from "react-native";
import React from "react";

export default function RestaurantScreen() {
  return (
    <View>
      <Text>RestaurantScreen</Text>
    </View>
  );
}

```

Then, update the App.js to add a new Stack.Screen.

```
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {HomeScreen, RestaurantScreen} from "./screens";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

```

Now open RestaurantCard.js:
Add the navigation to Touchable Opacity component

```

import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../lib/sanity";
import { useNavigation } from "@react-navigation/native";

export default function RestaurantCard({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="bg-white mr-3 shadow"
      onPress={() => {
        // "Restaurant" is the key used in App.js stack.screen name: <Stack.Screen name="Restaurant" component={RestaurantScreen} />

        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
    >
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className="h-36 rounded-sm"
      />
      <View className="px-3 pb-4">
        <Text className="font-cold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating} </Text>· {genre}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="gray" opacity={0.4} size={22} />
          <Text className="text-xs text-gray-500">Nearby · {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

```

Now edit RestaurantScreen.js:

```
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../lib/sanity";
import {
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon, StarIcon } from "react-native-heroicons/solid";
import { DishRow } from "../components";

export default function RestaurantScreen() {
  const navigation = useNavigation();
  // const route = useRoute();
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView>
      <View className="relative">
        <Image
          source={{ uri: urlFor(imgUrl).url() }}
          className="w-full h-56 bg-gray-300 p-4"
        />
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
        >
          <ArrowLeftIcon color="#00CCBB" className="" />
        </TouchableOpacity>
      </View>
      <View className="bg-white">
        <View className="px-4 pt-4">
          <Text className="text-3xl font-bold">{title}</Text>
          <View className="flex-row space-x-2 my-1">
            <View className="flex-row items-center space-x-1">
              <StarIcon color="green" opcaity={0.5} size={22} />
              <Text className="text-xs text-gray-500">
                <Text className="text-green-500">{rating}</Text> · {genre}
              </Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <MapPinIcon color="gray" opcaity={0.4} size={22} />
              <Text className="text-xs text-gray-500 flex-wrap">
                <Text className="text-gray-500">Nearby</Text> · {address}
              </Text>
            </View>
          </View>
          <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
        </View>

        <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
          <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
          <Text className="pl-2 flex-1 text-md font-bold">
            Have a food allergy?
          </Text>
        </TouchableOpacity>
      </View>
       <View className="pb-36">
        <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
        {/* Dish Row */}
        {dishes.map((dish) => (
          <DishRow
            key={dish._id}
            id={dish._id}
            name={dish.name}
            description={dish.short_description}
            price={dish.price}
            image={dish.image}
          />
        ))}
      </View>
    </ScrollView>
  );
}

```

Install react currency formatter:
https://www.npmjs.com/package/react-currency-formatter

```
npm install react-currency-formatter
npm audit fix --force
```

Create a component DishRow in components folder:

```
import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../lib/sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";

export default function DishRow({ id, name, description, price, image }) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed((prev) => !prev)}
        // className="bg-white p-4 border border-gray-200"
        className={`bg-white p-4 border border-gray-200 ${isPressed && "border-b-0"}`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">
              <Currency quantity={price} currency="GBP" />
            </Text>
          </View>

          <View>
            <Image
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20  bg-gray-300 p-4 border-[1px] border-gray-200"
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center">
            <TouchableOpacity>
              <MinusCircleIcon
                size={40}
              />
            </TouchableOpacity>
            <Text>0</Text>
            <TouchableOpacity>
              <PlusCircleIcon
                size={40}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

```

## Implementing Redux:

https://redux-toolkit.js.org/tutorials/quick-start

```
npm install @reduxjs/toolkit react-redux
```

Create redux folder and a store.js in it.
In store.js:

```
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})
```

Wrap The App with the react-redux provider:

```
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import { store } from './redux/store'
import { Provider } from 'react-redux'
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

```

Next create redux/features/basketSlice.js:

```
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id == action.payload.id
      );
      let newBasket = [...state.items];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id:${action.payload.id}) as it's not in basket!`
        );
      }
      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;
export const selectBasketItems = (state) => state.basket.items;
export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);
export default basketSlice.reducer;


```

Now import the reducer into redux/store.js:

```
import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice"
export const store = configureStore({
  reducer: {
    basket:basketReducer,
  },
});

```

Open DishRow.js:

```
import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../lib/sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../redux/features/basketSlice";

export default function DishRow({ id, name, description, price, image }) {
  const [isPressed, setIsPressed] = useState(false);
  // const items = useSelector(selectBasketItems);
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };
  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed((prev) => !prev)}
        // className="bg-white p-4 border border-gray-200"
        className={`bg-white p-4 border border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">
              <Currency quantity={price} currency="GBP" />
            </Text>
          </View>

          <View>
            <Image
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20  bg-gray-300 p-4 border-[1px] border-gray-200"
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={removeItemFromBasket}>
              <MinusCircleIcon size={40} color="#00CCBB" />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon size={40} color="#00CCBB" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

```

Add a new selector variable in the BasketSlice.js:

```
export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);
```

We need to create a BasketIcon.js component:

```
import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../redux/features/basketSlice";
import { useNavigation } from "@react-navigation/native";

export default function BasketIcon() {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal=useSelector(selectBasketTotal);
  return (
    <View>
      <Text>BasketIcon</Text>
    </View>
  );
}

```

Next add the BasketICon.js component to the RestaurantScreen.js:

```
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../lib/sanity";
import {
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon, StarIcon } from "react-native-heroicons/solid";
import { DishRow, BasketIcon } from "../components";

export default function RestaurantScreen() {
  const navigation = useNavigation();
  // const route = useRoute();
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon color="#00CCBB" className="" />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opcaity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}</Text> · {genre}
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <MapPinIcon color="gray" opcaity={0.4} size={22} />
                <Text className="text-xs text-gray-500 flex-wrap">
                  <Text className="text-gray-500">Nearby</Text> · {address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
            <Text className="pl-2 flex-1 text-md font-bold">
              Have a food allergy?
            </Text>
          </TouchableOpacity>
        </View>
        <View className="pb-36">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
          {/* Dish Row */}
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

```

Now update the BasketIcon.js as needed:

```
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectBasketItems,
  selectBasketTotal,
} from "../redux/features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";

export default function BasketIcon() {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length === 0) return null;
  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity className="bg-[#00CCBB] mx-5 p-4 rounded-lg flex-row items-center justify-between space-x-1">
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">
          {items.length}
        </Text>
        <Text className="text-white font-extrabold text-lg text-center">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">
          <Currency quantity={basketTotal} currency="GBP" />
        </Text>
      </TouchableOpacity>
    </View>
  );
}


```

Create a screens/BasketScreen.js:

```
import { View, Text } from "react-native";
import React from "react";

export default function BasketScreen() {
  return (
    <View>
      <Text>BasketScreen</Text>
    </View>
  );
}

```

Next we need to add the BasketScreen to App.js:

```
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {BasketScreen, HomeScreen, RestaurantScreen} from "./screens";
import { store } from "./redux/store";
import { Provider } from "react-redux";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{ presentation: "modal", headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

```

Update the BasketIcon.js component to link to the BasketScreen:

```
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectBasketItems,
  selectBasketTotal,
} from "../redux/features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";

export default function BasketIcon() {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length === 0) return null;
  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="bg-[#00CCBB] mx-5 p-4 rounded-lg flex-row items-center justify-between space-x-1"
      >
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">
          {items.length}
        </Text>
        <Text className="text-white font-extrabold text-lg text-center">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">
          <Currency quantity={basketTotal} currency="GBP" />
        </Text>
      </TouchableOpacity>
    </View>
  );
}


```

Let's create a restaurantSlice.js in redux/features:

```
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurant: {
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null,
    long: null,
    lat: null,
  },
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions;
export const selectRestaurant = (state) => state.restaurant.restaurant;
export default restaurantSlice.reducer;

```

Update redux/features/index.js:

```
export { default as basketReducer } from "./basketSlice";
export { default as restaurantReducer } from "./restaurantSlice";

```

Connect restaurantSlice.js to the store:
In redux/store.js:

```
import { configureStore } from "@reduxjs/toolkit";
import { basketReducer, restaurantReducer } from "./features";
export const store = configureStore({
reducer: {
basket: basketReducer,
restaurant: restaurantReducer,
},
});

```

Update RestaurantScreen.js:

```
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../lib/sanity";
import {
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon, StarIcon } from "react-native-heroicons/solid";
import { DishRow, BasketIcon } from "../components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../redux/features/restaurantSlice";

export default function RestaurantScreen() {
  const navigation = useNavigation();
  // const route = useRoute();

  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, [dispatch]);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon color="#00CCBB" className="" />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opcaity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}</Text> · {genre}
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <MapPinIcon color="gray" opcaity={0.4} size={22} />
                <Text className="text-xs text-gray-500 flex-wrap">
                  <Text className="text-gray-500">Nearby</Text> · {address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
            <Text className="pl-2 flex-1 text-md font-bold">
              Have a food allergy?
            </Text>
          </TouchableOpacity>
        </View>
        <View className="pb-36">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
          {/* Dish Row */}
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

```

Next, update BasketScreen.js:

```
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectRestaurant } from "../redux/features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../redux/features/basketSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../lib/sanity";
import Currency from "react-currency-formatter";

export default function BasketScreen() {
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const basketTotal = useSelector(selectBasketTotal);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);
  console.log(groupedItemsInBasket);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View className="">
            <Text className="text-lg font-cold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00CCBB" height={50} width={50} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: "https://images.prismic.io/dbhq-deliveroo-riders-website/ed825791-0ba4-452c-b2cb-b5381067aad3_RW_hk_kit_importance.png?auto=compress,format&rect=0,0,1753,1816&w=1400&h=1450",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                <Currency quantity={items[0]?.price} currency="GBP" />
              </Text>
              <TouchableOpacity>
                <Text
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                  className="text-[#00CCBB] text-xs"
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={basketTotal} currency="GBP" />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={5.99} currency="GBP" />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">
              <Currency quantity={basketTotal + 5.99} currency="GBP" />
            </Text>
          </View>
          <TouchableOpacity className="rounded-lg bg-[#00CCBB] p-4">
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

```

Next create a new screen in screens/PreparingOrderScreen.js:
First install react-native-animatable and react-native-progress:
https://github.com/oblador/react-native-animatable
https://www.npmjs.com/package/react-native-progress

```
npm install react-native-animatable --save
npm install react-native-progress --save
```

Then update PreparingOrderScreen.js:

```
import { SafeAreaView } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function PreparingOrderScreen() {
  const orderLoadingImg = require("../assets/images/orderLoading1.gif");
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);
  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
      <Animatable.Image
        source={orderLoadingImg}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />
      <Animatable.Text
        animation="slideInUp"
        className="text-lg my-10 text-white font-bold text-center"
        iterationCount={1}
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
}

```

update App.js with the new screen :

```
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {BasketScreen, HomeScreen, PreparingOrderScreen, RestaurantScreen} from "./screens";
import { store } from "./redux/store";
import { Provider } from "react-redux";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen} options={{ presentation: "fullScreenModal", headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


```

Update BasketScreen.js to include the new screen onPress:

```
          <TouchableOpacity
            onPress={navigation.navigate("PreparingOrder")}
            className="rounded-lg bg-[#00CCBB] p-4"
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
```

First install react-native-maps
https://docs.expo.dev/versions/latest/sdk/map-view/

```
npx expo install react-native-maps
```

Next, create a new screen in screens/DeliveryScreen.js:

```
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../redux/features/restaurantSlice";
import { XMarkIcon } from "react-native-heroicons/outline";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

export default function DeliveryScreen() {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const orderLoadingImg = require("../assets/images/orderLoading.gif");
  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>
        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-3xl font-bold">45-55 Minutes</Text>
            </View>
            <Image source={orderLoadingImg} className="h-20 w-20" />
          </View>
          <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />
          <Text className="mt-3 text-gray-500">
            Your order at {restaurant.title} is being prepared...
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={{
            uri: "https://images.prismic.io/dbhq-deliveroo-riders-website/ed825791-0ba4-452c-b2cb-b5381067aad3_RW_hk_kit_importance.png?auto=compress,format&rect=0,0,1753,1816&w=1400&h=1450",
          }}
          className="rounded-full h-12 w-12 bg-gray-300 p-4 ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Jake Ryan</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
      </SafeAreaView>
    </View>
  );
}

```

update App.js with the new screen :

```
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {BasketScreen, DeliveryScreen, HomeScreen, PreparingOrderScreen, RestaurantScreen} from "./screens";
import { store } from "./redux/store";
import { Provider } from "react-redux";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen} options={{ presentation: "fullScreenModal", headerShown: false }}/>
          <Stack.Screen name="Delivery" component={DeliveryScreen} options={{ presentation: "fullScreenModal", headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
```
