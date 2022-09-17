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
