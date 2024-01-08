import axios from "axios";
import { Course, CourseCollection, Label } from "../model";


export async function getLabels() {
    const res = await axios.get('/api/labels');
    return res.data as Label[]
}
export interface CourseParams {
    page?: number,
    size?: number,
    name?: string,
    teacherId?: number,
    studentId?: number,
    labels?: number[]
}
export async function searchCourses(params?: CourseParams) {
    const res = await axios.get('/api/courses', { params })
    return res.data as CourseCollection;
}

export async function getCourseById(id: number) {
    try {
        const res = await axios.get('/api/courses/' + id);
        return res.data as Course;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message)
        }
        throw new Error("Unexpected error")
    }

}