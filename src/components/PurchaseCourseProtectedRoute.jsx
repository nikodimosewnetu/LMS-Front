import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { useParams, Navigate } from "react-router-dom";

const PurchaseCourseProtectedRoute = ({ children }) => {
  const { courseId } = useParams();
  const { data, isLoading, isError, error } = useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    // You could handle specific errors or log them
    console.error(error);
    return <p>Error loading course details. Please try again later.</p>;
  }

  // If the course has been purchased, allow access to the children component
  return data?.purchased ? children : <Navigate to={`/course-detail/${courseId}`} />;
};

export default PurchaseCourseProtectedRoute;
