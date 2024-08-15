
// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import Contact from "./pages/Contact";
// import SignInPage from "./pages/SignInPage";
// import Signup from "./pages/Signup";
// import ChooseBranch from "./pages/ChooseBranch";
// import AdminSignIn from "./pages/AdminSignIn";
// import BeSemester from "./pages/BeSemester";
// import MeSemester from "./pages/MeSemester";
// import Home2 from "./pages/Home2";
// import CreateSubjectList from "./pages/CreateSubjectList";
// import CreateMaterial from "./pages/CreateMaterial";
// import Profile from "./pages/Profile";
// import MainSubjectShowPage from "./pages/MainSubjectShowPage";
// import AdminProfile from "./pages/AdminProfile";
// import SignInAs from "./components/SignInAs";
// import UserProtectedRoute from "./components/UserProtectedRoute";
// import MainData from "./pages/MainData";
// import YourFolder from "./pages/YourFolder";
// import AddCreateMaterial from "./pages/AddCreateMaterial";
// import DeletePage from "./pages/DeletePage";
// import DocDeletePage from "./pages/DocDeletePage";
// import Comments from "./pages/Comments";
// import AdminComments from "./pages/AdminComments";
// import AdminProtectedRoute from "./components/AdminProtectedRoute";
// import LoadingPage from "./components/LoadingPage";
// import Error from "./components/Error";
// import UniversalProtector from "./components/UniversalProtector";
// import UniversalProtector2 from "./components/UniversalProtector2";
// import Updatelecturelinks from "./pages/Updatelecturelink";
// import Updatedocumentaionlinks from "./pages/Updatedocumentaionlin";
// import UpdateSubjectNotes from "./pages/Updatesubjectnotes";
// import Updatequestionpaper from "./pages/Updatequestionpaper";

// function App() {
//   return (
//     <div className="font-semibold">
//       <Routes>
//         <Route path="/home" element={ 
//       <UniversalProtector> 
//         <Home/>
//       </UniversalProtector>
          
//          } /> 

//         <Route path="/" element={ 
//           <UniversalProtector2>  
//                 <Home2 /> 
//             </UniversalProtector2> 
//          } />
//         <Route path="/contactus" element={  
//           <UserProtectedRoute> 

//             <Contact /> 
//           </UserProtectedRoute> 
//           } />
//         <Route path="/select" element={  
//           <UniversalProtector> 

//             <ChooseBranch /> 
//           </UniversalProtector>
          
//           } />
//         <Route path="/select/b.e" element={  
//           <UniversalProtector>

//             <BeSemester /> 
//           </UniversalProtector>
//           } />
//         <Route path="/select/m.e" element={ 
//            <UniversalProtector>  
//              <MeSemester /> 

//            </UniversalProtector>
//            } />
//         <Route path="/b.e" element={  
//           <UniversalProtector> 
//             <BeSemester /> 
//           </UniversalProtector>
//           } />
//         <Route path="/m.e" element={ 
//           <UniversalProtector> 

//             <MeSemester /> 
//           </UniversalProtector> 
//           } />
//         <Route path="/user/signin" element={  
//           <UniversalProtector2> 

//             <SignInPage /> 
//           </UniversalProtector2>
//           } />
//         <Route path="/user/signup" element={ 
//            <UniversalProtector2> 
//                 <Signup />
//            </UniversalProtector2>
//            } />
//         <Route path="/signinas" element={<SignInAs />} />
//         <Route path="/admin/signin" element={  
//           <UniversalProtector2> 

//             <AdminSignIn /> 
//           </UniversalProtector2>
//           } />  
//         <Route path="/:degree/:branch/subjects/:subject/comment/:section" element={  
//           <UserProtectedRoute> 

//             <Comments/> 
//           </UserProtectedRoute>
//           }></Route> 
           
//             <Route path="/error" element={
//                       <UniversalProtector> 
//                      <Error/> 
//                     </UniversalProtector>
//             }></Route>
//         <Route path="/:degree/:branch/subjects/:subject/data" element={  
//           <UniversalProtector> 

//             <MainData/> 
//           </UniversalProtector>
//           }></Route>  
//         {/* <Route path="/profile/yourfolder" element={<YourFolder/>}></Route>    */}
//         <Route path="/admin/comments" element={ 
//             <AdminProtectedRoute> 
//               <AdminComments/>
//             </AdminProtectedRoute>

//         }> </Route> 
//         <Route path="/:degree/:branch/:subjects/:subject/docdelete" element={
//           <AdminProtectedRoute> 
//             <DocDeletePage/>
//           </AdminProtectedRoute>
//         }></Route>
//         <Route path="/:degree/:branch/subjects/:subject/delete" 
//           element={ 
//             <AdminProtectedRoute> 
//               <DeletePage></DeletePage>
//             </AdminProtectedRoute>
//           }
//         ></Route>
//         <Route path="/admin/create/:degree/:branch/:subject" element={ 
//           <AdminProtectedRoute> 
//             <AddCreateMaterial/>
//           </AdminProtectedRoute>
//         }></Route>
//         <Route path="/admin/create/:degree/:branch" element={ 
//           <AdminProtectedRoute>
//             <CreateMaterial /> 
//             </AdminProtectedRoute>
//           } />
//         <Route path="/profile" element={ 
//           <UserProtectedRoute>  
//             <Profile /> 
//           </UserProtectedRoute>
          
//           } />
//         <Route path="/:degree/:branch/subjects" element={  
//           <UniversalProtector> 
//             <MainSubjectShowPage /> 
//           </UniversalProtector>
//           } />
//         <Route path="/admin/profile" element={ 
//            <AdminProtectedRoute>
//             <AdminProfile /> 
//             </AdminProtectedRoute>
//           } />
//         <Route
//           path="/admin/create"
//           element={
//              <AdminProtectedRoute>
//               <CreateSubjectList />
//               </AdminProtectedRoute>
//           }
//         />
//       <Route path="/loading" element={<LoadingPage></LoadingPage>}></Route> 

//       <Route path="*" element={<Error/>} />   

//             <Route path={"/:degree/:branch/subjects/:subject/update-links/:id"} element={    
//               <AdminProtectedRoute> 

//                 <Updatelecturelinks/> 
//               </AdminProtectedRoute>
//               }></Route>  
               
//                <Route path={`/:degree/:branch/subjects/:subject/update-doclinks/:id`} 
//                element={ 
//                 <AdminProtectedRoute> 
//                   <Updatedocumentaionlinks/>
//                 </AdminProtectedRoute>
//                }/>   
                
//                 <Route path={`/:degree/:branch/subjects/:subject/update-subject-notes/:id`}  
//                  element={ 
//                   <AdminProtectedRoute> 
//                    <UpdateSubjectNotes/>
//                   </AdminProtectedRoute>
//                  }
//                  /> 
                  
//                   <Route path={`/:degree/:branch/subjects/:subject/update-question-paper/:id`} 
//                   element={ 
//                     <AdminProtectedRoute> 
//                       <Updatequestionpaper/>
//                     </AdminProtectedRoute>
//                   }/>  
                   
//                    <Route path={`/profile/yourfolder`} element={ 
//                     <UserProtectedRoute> 
//                           <YourFolder></YourFolder>
//                     </UserProtectedRoute>
//                    }></Route>

              

//       </Routes> 
//     </div>
//   );
// }

// export default App; 


import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import SignInPage from "./pages/SignInPage";
import Signup from "./pages/Signup";
import ChooseBranch from "./pages/ChooseBranch";
import AdminSignIn from "./pages/AdminSignIn";
import BeSemester from "./pages/BeSemester";
import MeSemester from "./pages/MeSemester";
import Home2 from "./pages/Home2";
import CreateSubjectList from "./pages/CreateSubjectList";
import CreateMaterial from "./pages/CreateMaterial";
import Profile from "./pages/Profile";
import MainSubjectShowPage from "./pages/MainSubjectShowPage";
import AdminProfile from "./pages/AdminProfile";
import SignInAs from "./components/SignInAs";
import UserProtectedRoute from "./components/UserProtectedRoute";
import MainData from "./pages/MainData";
import YourFolder from "./pages/YourFolder";
import AddCreateMaterial from "./pages/AddCreateMaterial";
import DeletePage from "./pages/DeletePage";
import DocDeletePage from "./pages/DocDeletePage";
import Comments from "./pages/Comments";
import AdminComments from "./pages/AdminComments";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import LoadingPage from "./components/LoadingPage";
import Error from "./components/Error";
import UniversalProtector from "./components/UniversalProtector";
import UniversalProtector2 from "./components/UniversalProtector2";
import Updatelecturelinks from "./pages/Updatelecturelink";
import Updatedocumentaionlinks from "./pages/Updatedocumentaionlin";
import UpdateSubjectNotes from "./pages/Updatesubjectnotes";
import Updatesubjectnotes2 from "./pages/Updatesubjectnotes2"; 
import Updatequestionpaper2 from "./pages/Updatequestionpaper2"
import Updatelinks from "./pages/Updatelinks2";
import Updatedoclinks from "./pages/Updatedoclink2";

function App() {
  return (
    <div className="font-semibold">
      <Routes>
        <Route
          path="/home"
          element={
            <UniversalProtector>
              <Home />
            </UniversalProtector>
          }
        />

        <Route
          path="/"
          element={
            <UniversalProtector2>
              <Home2 />
            </UniversalProtector2>
          }
        />
        <Route
          path="/contactus"
          element={
            <UserProtectedRoute>
              <Contact />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/select"
          element={
            <UniversalProtector>
              <ChooseBranch />
            </UniversalProtector>
          }
        />
        <Route
          path="/select/b.e"
          element={
            <UniversalProtector>
              <BeSemester />
            </UniversalProtector>
          }
        />
        <Route
          path="/select/m.e"
          element={
            <UniversalProtector>
              <MeSemester />
            </UniversalProtector>
          }
        />
        <Route
          path="/b.e"
          element={
            <UniversalProtector>
              <BeSemester />
            </UniversalProtector>
          }
        />
        <Route
          path="/m.e"
          element={
            <UniversalProtector>
              <MeSemester />
            </UniversalProtector>
          }
        />
        <Route
          path="/user/signin"
          element={
            <UniversalProtector2>
              <SignInPage />
            </UniversalProtector2>
          }
        />
        <Route
          path="/user/signup"
          element={
            <UniversalProtector2>
              <Signup />
            </UniversalProtector2>
          }
        />
        <Route path="/signinas" element={<SignInAs />} />
        <Route
          path="/admin/signin"
          element={
            <UniversalProtector2>
              <AdminSignIn />
            </UniversalProtector2>
          }
        />
        <Route
          path="/:degree/:branch/subjects/:subject/comment/:section/:id"
          element={
            <UserProtectedRoute>
              <Comments />
            </UserProtectedRoute>
          }
        ></Route>

        <Route
          path="/error"
          element={
            <UniversalProtector>
              <Error />
            </UniversalProtector>
          }
        ></Route>
        <Route
          path="/:degree/:branch/subjects/:subject/data"
          element={
            <UniversalProtector>
              <MainData />
            </UniversalProtector>
          }
        ></Route>
        {/* <Route path="/profile/yourfolder" element={<YourFolder/>}></Route>    */}
        <Route
          path="/admin/comments"
          element={
            <AdminProtectedRoute>
              <AdminComments />
            </AdminProtectedRoute>
          }
        >
          {" "}
        </Route>
        <Route
          path="/:degree/:branch/:subjects/:subject/docdelete"
          element={
            <AdminProtectedRoute>
              <DocDeletePage />
            </AdminProtectedRoute>
          }
        ></Route>
        <Route
          path="/:degree/:branch/subjects/:subject/delete"
          element={
            <AdminProtectedRoute>
              <DeletePage></DeletePage>
            </AdminProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/create/:degree/:branch/:subject"
          element={
            <AdminProtectedRoute>
              <AddCreateMaterial />
            </AdminProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/create/:degree/:branch"
          element={
            <AdminProtectedRoute>
              <CreateMaterial />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <UserProtectedRoute>
              <Profile />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/:degree/:branch/subjects"
          element={
            <UniversalProtector>
              <MainSubjectShowPage />
            </UniversalProtector>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <AdminProtectedRoute>
              <AdminProfile />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/create"
          element={
            <AdminProtectedRoute>
              <CreateSubjectList />
            </AdminProtectedRoute>
          }
        />
        <Route path="/loading" element={<LoadingPage></LoadingPage>}></Route>

        <Route path="*" element={<Error />} />

        <Route
          path={"/:degree/:branch/subjects/:subject/update-links/:id"}
          element={
            <AdminProtectedRoute>
              <Updatelecturelinks />
            </AdminProtectedRoute>
          }
        ></Route>

        <Route
          path={`/:degree/:branch/subjects/:subject/update-doclinks/:id`}
          element={
            <AdminProtectedRoute>
              <Updatedocumentaionlinks />
            </AdminProtectedRoute>
          }
        />

        <Route
          path={`/:degree/:branch/subjects/:subject/update-subject-notes/:id`}
          element={
            <AdminProtectedRoute>
              <UpdateSubjectNotes />
            </AdminProtectedRoute>
          }
        />

        <Route
          path={`/:degree/:branch/subjects/:subject/update-question-paper/:id`}
          element={
            <AdminProtectedRoute>
              <Updatequestionpaper2 />
            </AdminProtectedRoute>
          }
        />

        <Route
          path={`/profile/yourfolder`}
          element={
            <UserProtectedRoute>
              <YourFolder></YourFolder>
            </UserProtectedRoute>
          }
        ></Route>

        <Route
          path={`/update/:degree/:branch/:subject/subject-notes/:id`}
          element={
            <AdminProtectedRoute>
              <Updatesubjectnotes2 />
            </AdminProtectedRoute>
          }
        ></Route>
        <Route
          path={`/update/:degree/:branch/:subject/question-paper/:id`}
          element={
            <AdminProtectedRoute>
              <Updatequestionpaper2 />
            </AdminProtectedRoute>
          }
        ></Route>    
         <Route
          path={`/update/:degree/:branch/:subject/links/:id`}
          element={
            <AdminProtectedRoute>
              <Updatelinks />
            </AdminProtectedRoute>
          }
        ></Route>  
         <Route
          path={`/update/:degree/:branch/:subject/documentation-link/:id`}
          element={
            <AdminProtectedRoute>
              <Updatedoclinks />
            </AdminProtectedRoute>
          }
        ></Route>

      </Routes>
    </div>
  );
}

export default App;

 


