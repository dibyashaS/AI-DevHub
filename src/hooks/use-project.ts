import { api } from '@/trpc/react'
import React from 'react'
import {useLocalStorage} from 'usehooks.ts'

const useProject = () => {
    const{data:project}=api.project.getProjects.useQuery()
    const{projectID,setProject}=useLocalStorage('ai-developer-tool-projectId',"")
    const project=projects?.find(project=>project.id===projectID)
    return{
        projects,
        project,
        projectID,
        setProject
    }
}

export default useProject