from pydantic import BaseModel , EmailStr , field_validator
from datetime import datetime
from typing import Optional
from uuid import UUID



class EmployeeBase(BaseModel):
    
    name : str
    team : str
    email : EmailStr
    password : str
    salary : int
    department : str

    @field_validator('email')
    @classmethod


    def email_validate(cls , value):
        valid_domains = 'dpd.emp.com'

        domain_name = value.split('@')[-1]

        if domain_name != valid_domains:
            raise ValueError('not valid email')
        
        return value
   

class createEmployee(EmployeeBase):
    pass    

class getEmployee(EmployeeBase):

    id : str

    class config:
        from_attribute = True


class ManagersBase(BaseModel):
    
    name : str
    team : str
    email : EmailStr
    password : str
    salary : int
    department : str

    @field_validator('email')
    @classmethod


    def email_validate(cls , value):
        valid_domains = 'dpd.mag.com'

        domain_name = value.split('@')[-1]

        if domain_name != valid_domains:
            raise ValueError('not valid email')
        
        return value
   

class createManagers(ManagersBase):
    pass    

class getManagers(ManagersBase):

    id : str

    class config:
        from_attribute = True
   


class FeedbackBase(BaseModel):
    employee_id: UUID
    manager_id: Optional[UUID] = None

    category: str
    communication: int
    skills: int
    timeliness: int
    teamwork: int

    feedbacktype: str
    created_at: Optional[datetime] = None
    feedback: str

    class Config:
        from_attribute = True

class FeedbackCreate(BaseModel):
  
    communication: int
    skills: int
    timeliness: int
    teamwork: int
    email : str
    department : str
    feedbacktype: str
    created_at: Optional[datetime] = None
    feedback: str

class FeedbackOut(FeedbackCreate):
    id: UUID
    created_at: datetime

    class Config:
        from_attribute = True


class Token(BaseModel):
    access_token: str
    token_type: str        
