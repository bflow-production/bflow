const ProfileView = ({ userData }) => {
    return (
      <div className="profile-view">
        <h2>Profile</h2>
        <p>Age: {userData?.profile?.age}</p>
        <p>Location: {userData?.profile?.location}</p>
      </div>
    );
  };
  
  export default ProfileView;