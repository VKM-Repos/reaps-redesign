const COLORS = ['#DE3B40', '#192C8A'];

export function CustomLegend({ data }: { data: any[] }) {
  return (
    <div className="mt-4 space-y-5 w-full max-w-[70%] mx-auto">
      {data.map((item, index) => {
        const { submissions, gender } = item;
        const capitalized_gender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();

        return (
            <div key={gender} className="flex justify-between">
                <p className="flex items-center gap-2">
                    <span
                        className="inline-block w-5 h-5 rounded-lg"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></span>

                <span className="font-medium text-muted-foreground text-black/40">
                    {capitalized_gender}
                </span>
                </p>
            <span className="font-medium text-foreground">{submissions} {submissions > 0 ? 'Submissions' : 'Submission'}</span>
            </div>

        )})}
    </div>
  );
}
