import MainLayout from "@/components/layout/MainLayout/MainLayout";

import Hero from "@/components/Home/Hero/Hero";
import PopularCourses from "@/components/Home/PopularCourses/PopularCourses";

export default function HomePage(){
  return (
    <MainLayout>
      <Hero/>
      <PopularCourses/>
    </MainLayout>
  );
}
