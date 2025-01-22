

const Faq = () => {
  return (
    <section className="section space-y-4">
      <div className="collapse collapse-arrow bg-main-color/30 rounded-md">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          How do I earn money as a worker?
        </div>
        <div className="collapse-content">
          <p>
            Workers can browse available tasks, complete them as instructed, and
            submit their work for approval. Once approved, coins are added to
            your account, which can later be withdrawn.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-main-color/30 rounded-md">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          What is the value of the coins earned?
        </div>
        <div className="collapse-content">
          <p>
            Workers can withdraw 1 dollar for every 20 coins they have
            accumulated. The minimum withdrawal amount is 200 coins, equivalent
            to 10 dollars.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-main-color/30 rounded-md">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          What happens if my submission is rejected?
        </div>
        <div className="collapse-content">
          <p>
            If your submission is rejected, the task will be available for
            others to complete, and you may attempt it again if necessary.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-main-color/30 rounded-md">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          What happens after I submit a withdrawal request?
        </div>
        <div className="collapse-content">
          <p>
            Once a withdrawal request is made, the admin will review and approve
            it. After approval, your selected payment method (Bkash, Rocket,
            Nagad, etc.) will receive the funds.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-main-color/30 rounded-md">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          Are there any fees for using the platform?
        </div>
        <div className="collapse-content">
          <p>
            There are no registration fees, but the platform earns revenue by
            applying different exchange rates between purchased and withdrawn
            coins.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Faq;