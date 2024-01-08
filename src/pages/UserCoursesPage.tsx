import React, { useEffect, useState } from 'react'
import { CourseCollection, Label } from '../model';
import Loader from '../components/Loader';
import { getLabels, searchCourses } from '../service/services';
import CourseCard from '../components/CourseCard';
import CourseFilter from '../components/CourseFilter';

export default function UserCoursesPage() {
    const [searchParams, setSearchParams] = useState<any>({})
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<CourseCollection | undefined>(undefined)
    const [labels, setLabels] = useState<Label[]>([])

    useEffect(() => {
        getLabels()
            .then(setLabels)
    }, [])

    useEffect(() => {
        setLoading(true);
        searchCourses(searchParams)
            .then(setCourses)
            .finally(() => setLoading(false))
    }, [searchParams])
    return (
        <div>
            <h2 className='mt-2 text-center'>
                <strong>Courses</strong>
            </h2>
            <CourseFilter
                value={searchParams}
                onChange={setSearchParams}
                labels={labels}
                maxPage={courses && courses.data.length > 0 ? Math.ceil(courses.total / courses.data.length) : 1}
            />
            {
                loading ? (<Loader />) : (
                    <div className='flex-container'>
                        {courses?.data.map(course => {
                            return (
                                <div className='mt-2 p-1' key={course.id}>
                                    <CourseCard course={course} />
                                </div>
                            )
                        })}
                    </div>
                )
            }
        </div>
    )
}
