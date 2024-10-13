import { db } from "@/db";
import { getCurrentUser } from "@/lib/actions/UserActions";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const {
      userId,
      isGroup,
      members,
      name
    } = body;

    if (!currentUser?.id || !currentUser.email) {
      return new Response("Not authorized", { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new Response("Invalid data", { status: 400 });
    }

    if (isGroup) {
      const newConversation = await db.conversation.create({
        data: {
          name: name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        }
      });

      // NOTM INE 
      // return NextResponse.json(newConversation)
      return new Response(JSON.stringify(newConversation))
    }

    const existingConversations = await db.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            }
          },
          {
            userIds: {
              equals: [userId, currentUser.id]
            }
          }
        ]
      }
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return new Response(JSON.stringify(singleConversation))
    }

    const newConversation = await db.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            }
          ]
        }
      },
      include: {
        users: true,
      }
    });

    return new Response(JSON.stringify(newConversation))


  } catch (error) {
    console.log("Coversations API", error)
  }
}