from fastapi import FastAPI, Depends , HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from schema import getEmployee , createEmployee , createManagers , FeedbackCreate , Token
from dbConnect import get_db , create_table
import model
from model import Employee , Manager , Feedback
from fastapi.middleware.cors import CORSMiddleware
from auth import hash_password, verify_password, create_access_token 
from fastapi.security import OAuth2PasswordRequestForm
from auth import oauth2_scheme , decode_token
from typing import List

app = FastAPI()

create_table()


print("welcome to server")
origins = [
      'http://localhost:5173',     # for React dev
#     "http://127.0.0.1:3000",
#     "https://your-frontend.com"  # production frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # ✅ frontend URLs allowed
    allow_credentials=True,
    allow_methods=["*"],              # ✅ allow all HTTP methods
    allow_headers=["*"]               # ✅ allow all headers
)

@app.get('/')
def root():
    return{"mssg" : "hii suraj"}



@app.get('/employee')
def get_Employee(dbs : Session = Depends(get_db)):
    Employees = dbs.query(Employee).all()
    
    return Employees
    


@app.post('/employee')
def create_Employee(data : createEmployee  , db : Session = Depends(get_db)):
    new_employee = Employee(**data.model_dump())
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    return {"msg" : "user created successfully"}


@app.get('/manager')
def get_manager(db : Session = Depends(get_db)):
    Managers_Data = db.query(Manager).all()

    return Managers_Data

@app.post('/manager')
def create_manager(data : createManagers , db : Session = Depends(get_db)):
    new_Manager = Manager(**data.model_dump())
    db.add(new_Manager)
    db.commit()
    db.refresh(new_Manager)

    return{"mssg" : "manager created successfully"}

@app.get('/Teams')
def get_team(db:Session=Depends(get_db)):
   
   team =  db.query(Employee.department).distinct().all()
   team_list = [t[0] for t in team] 
   return team_list


@app.get('/teamMembers/{department}')
def get_members(department : str , db:Session = Depends(get_db)):
    members  = db.query(Employee).filter(Employee.department == department).all()
    print(members)
    return members


@app.post('/feedback')
def post_feedback(data : FeedbackCreate, access_token: str = Depends(oauth2_scheme), db:Session=Depends(get_db)):
    print('access token' , access_token)
    user = decode_token(access_token , db)
    
    # print('user' , user)
    temp =  db.query(Employee).filter(Employee.email==data.email).first()
    # print(temp)
    feedback_data = data.model_dump()

    ratings = [
    feedback_data.get("communication", 0),
    feedback_data.get("skills", 0),
    feedback_data.get("timeliness", 0),
    feedback_data.get("teamwork", 0),
    ]

    average_rating = sum(ratings) / len(ratings)
    feedback_data["rating"] = round(average_rating, 0) 

    feedback_data.pop("email", None) 
    feedback_data.pop("department", None) 
    feedback_data['category'] = data.feedbacktype
    feedback_data["employee_id"] = temp.id
    feedback_data["manager_id"] = user.id
    # print("feedback data : " , feedback_data)
    # print(data)
    new_feedback = Feedback(**feedback_data)
    db.add(new_feedback)
    db.commit()
    db.refresh(new_feedback)
    return{"mssg" : 'feeback submitted'}









@app.post("/signup/employee")
def signup_employee(user: createEmployee, db: Session = Depends(get_db)):
    if db.query(model.Employee).filter_by(email=user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = Employee(name=user.name, email=user.email, password=hash_password(user.password))
    db.add(new_user)
    db.commit()
    return {"msg": "Employee account created"}

@app.post("/signup/manager")
def signup_manager(user: createManagers, db: Session = Depends(get_db)):
    if db.query(Manager).filter_by(email=user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = Manager(name=user.name, email=user.email, team=user.team, department=user.department,salary=user.salary, password=hash_password(user.password))
    db.add(new_user)
    db.commit()
    return {"msg": "Manager account created"}

@app.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(Employee).filter_by(email=form_data.username).first()
    user_type = "employee"

    if not user:
        user = db.query(Manager).filter_by(email=form_data.username).first()
        user_type = "manager"
    
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token(data={"sub": user.email, "role": user_type})
    return {"access_token": token, "token_type": "bearer"}
   





@app.get('/logs')
def get_logs(token : str = Depends(oauth2_scheme) , db:Session=Depends(get_db)):
    user = decode_token(token , db)

    print('log user' , user.name)

    userFeedback = db.query(Feedback).filter(Feedback.manager_id == user.id).all()
    
    
    response=[]
    index = 0
    for ele in userFeedback:
     response.append({
        "feedback": ele.feedback,
        "employee_mail": ele.employee.email,
        "manager_mail": ele.manager.email,
        "rating": ele.rating,
        'communication' : ele.communication,
        'skills' : ele.skills,
        'teamwork' : ele.teamwork,
        'timeliness' : ele.timeliness,
        'feedbacktype' : ele.feedbacktype,
        'timestamp' : ele.created_at
     })
     index = index+1
     
     
    print(response)
    return response










