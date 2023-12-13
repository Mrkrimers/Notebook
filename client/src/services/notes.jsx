import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/course' }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (credential) => ({
                url: '/',
                method: 'POST',
                body: credential
            })
        }),
        updateCourse: builder.mutation({
            query: (credential) => ({
                url: `/${credential.id}`,
                method: 'PUT',
                body: credential
            })
        }),
        deleteCourse: builder.mutation({
            query: (credential) => ({
                url: `/${credential.id}`,
                method: 'DELETE'
            })
        }),
        getCourseById: builder.query({
            query: (id) => `/${id}`
        }),
        getAllCourse: builder.query({
            query: () => '/'
        })
    })
})

export const { useCreateCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    useGetAllCourseQuery,
    useGetCourseByIdQuery } = courseApi