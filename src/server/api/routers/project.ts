import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
  // Procedure to create a project
  createProject: publicProcedure
    .input(
      z.object({
        name: z.string(),
        gitHubURL: z.string().url("Invalid GitHub URL"),
        gitHubToken: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to create a project",
        });
      }

      if (input.gitHubToken) {
        console.log(`GitHub token provided: ${input.gitHubToken}`);
      }

      try {
        const project = await ctx.db.project.create({
          data: {
            githubUrl: input.gitHubURL,
            name: input.name,
            userToProjects: {
              create: {
                userID: ctx.user.userId!,
              },
            },
          },
        });

        return project;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creating the project",
          cause: error,
        });
      }
    }),

  // Procedure to get all projects for the logged-in user
  getProjects: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.project.findMany({
        where: {
          userToProjects: {
            some: {
              userId: ctx.user.userId!,
            },
          },
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error fetching projects",
        cause: error,
      });
    }
  }),

  // Alternative procedure to get projects for the logged-in user
  getMyProjects: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in.",
      });
    }

    try {
      const projects = await ctx.db.project.findMany({
        where: {
          userToProjects: {
            some: {
              userId: ctx.user.userId!,
            },
          },
        },
      });

      return projects;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error fetching your projects",
        cause: error,
      });
    }
  }),
});

