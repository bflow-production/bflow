const TrainingView = ({ userData }) => {
    return (
      <div className="training-view">
        <h2>Training</h2>
        <ul>
          {userData?.training?.map((item, index) => (
            <li key={index}>
              {item?.date}: {item?.workout}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  export default TrainingView