import { prisma } from "../lib/prisma"

async function findVideo(videoId: string) {
  const video = await prisma.video.findUniqueOrThrow({
    where: {
      id: videoId,
    }
  })
  return video;
}


async function updateVideo(videoId: string, transcription: string, videoName: string, userId: string) {
  async function updateVideo(videoId: string, transcription: string, videoName: string, userId: string) {
    const video = await prisma.video.findUnique({
      where: {
        id: videoId,
      },
    });

    if (!video) {
      throw new Error(`Video with ID ${videoId} not found.`);
    }
    
    await prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        transcription,
        name: videoName,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}



export const transcriptionRepositories = { findVideo, updateVideo }