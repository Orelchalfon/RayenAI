import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.action";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();
  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! })]); // Fetch user interviews and latest interviews
  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpComingInterviews = latestInterviews?.length! > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {
            hasPastInterviews ? (
              userInterviews?.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  {...interview}
                />
              ))
            ) : (
              <div className="flex flex-col gap-4">
                <h3 className="text-lg">No interviews yet</h3>
                <p className="text-sm text-muted-foreground">
                  You can start an interview by clicking the button above.
                </p>
              </div>
            )
          } </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Peek an interview</h2>

        <div className="interviews-section">
          {
            hasUpComingInterviews ? (
              latestInterviews?.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  {...interview}
                />
              ))
            ) : (
              <div className="flex flex-col gap-4">
                <h3 className="text-lg">⛔{" "}No available Interviews</h3>
                <h2  className="text-sm text-muted-foreground">

                  Create your own interview or check back later.
                </h2>
              </div>
            )
          }
        </div>
      </section>

    </>

  );
}
