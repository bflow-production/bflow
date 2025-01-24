const StatsView = ({ userData }) => {
    return (
      <div className="stats-view">
        <h2>Stats</h2>
        <p>Workouts: {userData?.stats?.workouts}</p>
        <p>Total Time: {userData?.stats?.total_time}</p>
      </div>
    );
  };
  export default StatsView