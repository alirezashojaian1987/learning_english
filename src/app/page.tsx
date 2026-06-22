import MainLayout from "@/components/layout/MainLayout/MainLayout";

import Hero from "@/components/Home/Hero/Hero";
import PopularCourses from "@/components/Home/PopularCourses/PopularCourses";
import FeaturedTutors from "@/components/Home/FeaturedTutors/FeaturedTutors";
import LatestBlogs from "@/components/Home/LatestBlogs/LatestBlogs";

export default function HomePage(){
  return (
    <MainLayout>
      <Hero/>
      <PopularCourses/>
      <FeaturedTutors/>
      <LatestBlogs/>
    </MainLayout>
  );
}
