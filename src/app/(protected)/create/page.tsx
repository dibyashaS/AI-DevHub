'use client';
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import React from "react";
import { api } from "@/trpc/react";
import {toast} from "sonner";

type FormInput = {
  repoURL: string;
  projectName: string;
  githubToken?: string;
};

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const createProject= api.project.createProject.useMutation()

  function onSubmit(data: FormInput) {
    createProject.mutate({
      gitHubURL:data.repoURL,
      name: data.projectName,
      gitHubToken:data.githubToken
    },{
      onSuccess:()=>{
        toast.success('Project created successfully')
    },
    onError:()=>{
      toast.error('Failed to create project')
    }
  })
    return true;
  }

  return (
    <div className="flex items-center gap-12 h-full justify-center">
      <div>
        <div>
          <h1 className="font-semibold text-2xl">Link your GitHub repository</h1>
          <p className="text-sm text-muted-foreground">
            Enter the details of your repository and project to link it to AI Developer Hub.
          </p>
        </div>
        <div className="h-4"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Project Name Input */}
          <Input
            {...register("projectName", { required: "Project Name is required" })}
            placeholder="Project Name"
            className="mb-4"
            required
          />

          {/* Repository URL Input */}
          <Input
            {...register("repoURL", { required: "Repository URL is required" })}
            placeholder="Repository URL"
            className="mb-4"
            required
          />
            {/* Repository token Input */}
          <Input
            {...register("githubToken")}
            placeholder="Github Token (Optional)"
            className="mb-4"
          />
          <button
            type="submit"
            className="mt-4 bg-primary text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;


